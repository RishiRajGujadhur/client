// commentSlice.ts
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../models/pagination";
import { CommentDto, CommentParams } from "../../models/comment";
import { AppDispatch, RootState } from "../../app/store/configureStore";

interface CommentState {
  commentsLoaded: boolean;
  status: string;
  commentParams: CommentParams;
  metaData: MetaData | null;
  commentsByProductId: Record<number, CommentDto[]>; // Add this property
}

const commentsAdapter = createEntityAdapter<CommentDto>();

function getAxiosParams(commentParams: CommentParams, productId: number) {
  const params = new URLSearchParams();
  params.append('pageNumber', commentParams.pageNumber.toString());
  params.append('pageSize', commentParams.pageSize.toString());
  params.append('ProductId', productId.toString());
  return params;
}

export const fetchCommentsForProductAsync = createAsyncThunk<CommentDto[], number, { state: RootState, dispatch: AppDispatch }>(
  'comments/fetchCommentsForProductAsync',
  async (productId, thunkAPI) => {
    const commentParams = thunkAPI.getState().comments.commentParams;
    const params = getAxiosParams(commentParams, productId);
    try {
      const response = await agent.Comment.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      // Dispatch a new action to store comments for the specific product
      thunkAPI.dispatch(setCommentsForProduct({ productId, comments: response.items }));
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const addCommentAsync = createAsyncThunk<CommentDto, { productId: number, text: string }, { state: RootState, dispatch: AppDispatch }>(
  'comments/addCommentAsync',
  async ({ productId, text }, thunkAPI) => {
    try {
      const response = await agent.Comment.createComment({ productId, text });
      return response; // Assuming the API returns the newly created comment
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const commentSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState<CommentState>({
    commentsLoaded: false,
    status: 'idle',
    commentParams: { pageNumber: 1, pageSize: 10, productId: 1 },
    metaData: null,
    commentsByProductId: {}, // Initialize commentsByProductId
  }),
  reducers: {
    setCommentParams: (state, action: PayloadAction<CommentParams>) => {
      state.commentsLoaded = false;
      state.commentParams = { ...state.commentParams, ...action.payload, pageNumber: action.payload.pageNumber};
    },
    setMetaData: (state, action: PayloadAction<MetaData>) => {
      state.metaData = action.payload;
    },
    setCommentsForProduct: (state, action: PayloadAction<{ productId: number; comments: CommentDto[] }>) => {
      const { productId, comments } = action.payload;
      state.commentsByProductId[productId] = comments;
    },
  },
  extraReducers: (builder => {
    builder.addCase(fetchCommentsForProductAsync.pending, (state) => {
      state.status = 'pendingFetchComments';
    });
    builder.addCase(fetchCommentsForProductAsync.fulfilled, (state, action) => {
      commentsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.commentsLoaded = true;
    });

    builder.addCase(fetchCommentsForProductAsync.rejected, (state, action) => {
      console.error('Fetch comments failed:', action.payload);
      state.status = 'idle';
    });

     // Add the new case for addCommentAsync
     builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      // Assuming the API returns the newly created comment
      commentsAdapter.addOne(state, action.payload);
    });

    builder.addCase(addCommentAsync.rejected, (state, action) => {
      console.error('Add comment failed:', action.payload);
      state.status = 'idle';
    });

  })
});

export const { setCommentParams, setMetaData, setCommentsForProduct } = commentSlice.actions;

export const commentSelectors = commentsAdapter.getSelectors((state: RootState) => state.comments);
