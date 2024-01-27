// useComments.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store/configureStore';
import { commentSelectors, fetchCommentsAsync, setCommentParams } from '../../features/comment/commentSlice';

export default function useComments(productId: number) {
  const comments = useAppSelector(commentSelectors.selectAll);
  const { commentsLoaded, metaData } = useAppSelector((state) => state.comments);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!commentsLoaded) {
      dispatch(fetchCommentsAsync(productId));
    }
  }, [dispatch, commentsLoaded, productId]);

  const handlePageChange = (page: number, pageSize: number, productId: number) => {

    console.log('Page number in useComments', page);
    // Update the comment params in the Redux store
    dispatch(setCommentParams({ pageNumber: page, pageSize, productId }));

    // Fetch comments with the updated params
    dispatch(fetchCommentsAsync(productId));
  };

  return { comments, commentsLoaded, metaData, handlePageChange };
}
