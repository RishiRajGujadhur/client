// commentSlice.ts
import { createAsyncThunk, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../models/pagination";
import { CommentDto, CommentParams } from "../../models/comment";
import { AppDispatch, RootState } from "../../app/store/configureStore";

interface CommentState {
    commentsLoaded: boolean;
    status: string;
    commentParams: CommentParams;
    metaData: MetaData | null;
}
 
const commentsAdapter = createEntityAdapter<CommentDto>({});

function getAxiosParams(commentParams: CommentParams, productId: number) {
    const params = new URLSearchParams();
    //commentParams.productId = productId;
    params.append('pageNumber', commentParams.pageNumber.toString());
    params.append('pageSize', commentParams.pageSize.toString());
    params.append('ProductId', productId.toString());
    
    // Add other parameters as needed
    return params;
}

export const fetchCommentsAsync = createAsyncThunk<CommentDto[], number, { state: RootState, dispatch: AppDispatch }>(
    'comments/fetchCommentsAsync',
    async (productId, thunkAPI) => {
        const commentParams = thunkAPI.getState().comments.commentParams;
        const params = getAxiosParams(commentParams, productId);
        try { 
            const response = await agent.Comment.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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
        commentParams: { pageNumber: 1, pageSize: 2, productId: 1 },
        metaData: null,
    }),
    reducers: {
        setCommentParams: (state, action: PayloadAction<CommentParams>) => {
            state.commentsLoaded = false; 
            state.commentParams = { ...state.commentParams, ...action.payload, productId: action.payload.productId };
        },
        setMetaData: (state, action: PayloadAction<MetaData>) => {
            state.metaData = action.payload;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchCommentsAsync.pending, (state) => {
            state.status = 'pendingFetchComments';
        });
        builder.addCase(fetchCommentsAsync.fulfilled, (state, action) => {
            commentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.commentsLoaded = true;
          });
          
        builder.addCase(fetchCommentsAsync.rejected, (state, action) => {
            console.error('Fetch comments failed:', action.payload);
            state.status = 'idle';
        });
    })
});

export const { setCommentParams, setMetaData } = commentSlice.actions;

export const commentSelectors = commentsAdapter.getSelectors((state: RootState) => state.comments);
