import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../../app/api/agent";
import { CommentDto } from "../../../models/comment/comment";
import { AppDispatch, RootState } from "../../../app/store/configureStore";
import { getAxiosParams } from "../../../app/util/apiUtils";
import { setCommentsForProduct, setMetaData } from "../commentSlice";

// Create an async thunk to fetch comments for a product
export const fetchCommentsForProductAsync = createAsyncThunk<CommentDto[], number, { state: RootState; dispatch: AppDispatch; }>(
  'comments/fetchCommentsForProductAsync',
  async (productId, thunkAPI) => {
    const commentParams = thunkAPI.getState().comments.commentParams;
    const params = getAxiosParams(commentParams, productId);
    try {
      // Make an API call to fetch comments for the product
      const response = await agent.Comment.list(params);
      // Dispatch an action to set the metadata for the comments
      thunkAPI.dispatch(setMetaData(response.metaData));
      // Dispatch an action to store the comments for the specific product
      thunkAPI.dispatch(setCommentsForProduct({ productId, comments: response.items }));
      return response.items;
    } catch (error: any) {
      // Handle any errors and reject the thunk with an error value
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
