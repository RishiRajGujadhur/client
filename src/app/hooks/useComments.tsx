import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store/configureStore';
import { setCommentParams } from '../../features/comment/commentSlice';
import { fetchCommentsForProductAsync } from "../../features/comment/asyncThunks/fetchCommentsForProductAsync";

export default function useComments(productId: number) {
  const comments = useAppSelector((state) => state.comments.commentsByProductId[productId] || []);
  const { commentsLoaded, metaData } = useAppSelector((state) => state.comments);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!commentsLoaded) {
      dispatch(fetchCommentsForProductAsync(productId));
    }
  }, [dispatch, commentsLoaded, productId]);

  const handlePageChange = (page: number, pageSize: number, productId: number) => {
    // Update the comment params in the Redux store
    dispatch(setCommentParams({ pageNumber: page, pageSize, productId }));

  };

  return { comments, commentsLoaded, metaData, handlePageChange};
}
