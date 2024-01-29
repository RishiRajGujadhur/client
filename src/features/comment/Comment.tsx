// Comment.tsx
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import useComments from '../../app/hooks/useComments';
import CommentPagination from './CommentPagination';
import { toast } from 'react-toastify';

interface CommentProps {
  productId: number;
}

const Comment: React.FC<CommentProps> = ({ productId }) => {
  const { comments, commentsLoaded, handlePageChange, metaData, handleAddComment } = useComments(productId);
  const [newComment, setNewComment] = useState('');

  const handleTextFieldKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment(newComment);
      setNewComment('');
      toast.success("Comment Posted!");
    }
  };

  if (!commentsLoaded) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <TextField
        fullWidth
        multiline
        rows={1}
        variant="outlined"
        label="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyPress={handleTextFieldKeyPress} // Handle "Enter" key press
        style={{ marginTop: '16px' }}
      />

      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <Avatar src={comment.username} alt={comment.username} />
              <ListItemText
                primary={`${comment.username} | ${comment.text}`}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <CommentPagination metaData={metaData} onPageChange={handlePageChange} productId={productId} />
    </div>
  );
};

export default Comment;
