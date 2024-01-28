// Comment.tsx
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import useComments from '../../app/hooks/useComments';
import CommentPagination from './CommentPagination';

interface CommentProps {
  productId: number;
}

const Comment: React.FC<CommentProps> = ({ productId }) => {
  const { comments, commentsLoaded, handlePageChange, metaData } = useComments(productId);
 
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    // Add new comment (you can dispatch an action here if needed)
    // ...

    // Reset newComment state
    setNewComment('');
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
        style={{ marginTop: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddComment} style={{ marginTop: '8px' }}>
        +
      </Button>
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={comment.text} />
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
