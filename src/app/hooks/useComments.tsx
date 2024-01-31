import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store/configureStore';
import { setCommentParams } from '../../features/comment/commentSlice';
import { addCommentAsync } from "../../features/comment/asyncThunks/addCommentAsync";
import { fetchCommentsForProductAsync } from "../../features/comment/asyncThunks/fetchCommentsForProductAsync";

export default function useComments(productId: number) {
  const comments = useAppSelector((state) => state.comments.commentsByProductId[productId] || []);
  const { commentsLoaded, metaData } = useAppSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!commentsLoaded) {
      dispatch(fetchCommentsForProductAsync(productId));
    }
  }, [dispatch, commentsLoaded, productId]);

  const handlePageChange = (page: number, pageSize: number, productId: number) => {
    // Update the comment params in the Redux store
    dispatch(setCommentParams({ pageNumber: page, pageSize, productId }));
    
    // Fetch comments with the updated params
    dispatch(fetchCommentsForProductAsync(productId));
  };
  
  const handleAddComment = (text: string) => {
    // Dispatch the addCommentAsync action
    dispatch(addCommentAsync({ productId, text })); 
    dispatch(setCommentParams({ pageNumber: 1, pageSize:10, productId }));
    dispatch(fetchCommentsForProductAsync(productId));
    setNewComment(''); // Clear the textfield
  };

  return { comments, commentsLoaded, metaData, handlePageChange, handleAddComment, newComment, setNewComment };
}
