import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../../app/api/agent";
import { CommentDto } from "../../../models/comment/comment";
import { AppDispatch, RootState } from "../../../app/store/configureStore";

export const addCommentAsync = createAsyncThunk<CommentDto, { productId: number; text: string; }, { state: RootState; dispatch: AppDispatch; }>(
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
