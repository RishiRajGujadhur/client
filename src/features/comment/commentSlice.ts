import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { CommentDto, CommentParams } from "../../models/comment/comment";
import { RootState } from "../../app/store/configureStore";
import { CommentState } from "../../models/comment/CommentState";
import { fetchCommentsForProductAsync } from "./asyncThunks/fetchCommentsForProductAsync";
import { addCommentAsync } from "./asyncThunks/addCommentAsync";
 
const commentsAdapter = createEntityAdapter<CommentDto>();
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
    setMetaData: (state, action: PayloadAction<MetaData>) => {
      state.metaData = action.payload;
    },
    // Set the comment parameters and mark comments as not loaded
    setCommentParams: (state, action: PayloadAction<CommentParams>) => {
      state.commentParams = { ...action.payload, pageNumber: action.payload.pageNumber };
      state.commentsLoaded = false;
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

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      commentsAdapter.addOne(state, action.payload);
    });

    builder.addCase(addCommentAsync.rejected, (state, action) => {
      console.error('Add comment failed:', action.payload);
      state.status = 'idle';
    });

  })
});

// Reducer to get/set the comment  and mark comments as not/loaded
export const { setCommentParams, setMetaData, setCommentsForProduct } = commentSlice.actions;

// Selectors to get comments from the state
export const commentSelectors = commentsAdapter.getSelectors((state: RootState) => state.comments);
