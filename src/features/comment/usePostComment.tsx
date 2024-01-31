import { useDispatch } from "react-redux";
import { addCommentAsync } from "./asyncThunks/addCommentAsync";
import { fetchCommentsForProductAsync } from "./asyncThunks/fetchCommentsForProductAsync";
import { setCommentParams } from "./commentSlice";
import { AppDispatch } from "../../app/store/configureStore";
import { useState } from "react";

export default function usePostComment() {
  const dispatch = useDispatch<AppDispatch>();
  const [newComment, setNewComment] = useState('');
  const handleAddComment: (text: string, productId: number) => void = (text, productId) => {
    // Dispatch the addCommentAsync action
    dispatch(addCommentAsync({ productId, text }));
    dispatch(setCommentParams({ pageNumber: 1, pageSize: 10, productId }));
    dispatch(fetchCommentsForProductAsync(productId));
    setNewComment(''); // Clear the textfield
  };
  return { handleAddComment, newComment, setNewComment };
};