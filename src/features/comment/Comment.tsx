import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import agent from '../../app/api/agent';

interface CommentProps {
  productId: number;
}

interface CommentDto {
  text: string;
}

const Comment: React.FC<CommentProps> = ({ productId }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the given productId
    agent.Comment.getCommentsByProduct(productId)
      .then((response) => setComments(response))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [productId]);

  const handleAddComment = () => {
    // Add new comment
    agent.Comment.createComment({ productId, text: newComment })
      .then(() => {
        // Refresh comments after adding a new one
        agent.Comment.getCommentsByProduct(productId)
          .then((response) => setComments(response))
          .catch((error) => console.error('Error fetching comments:', error));
        setNewComment('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };
  return (
    <div>
      <h3>Comments</h3>
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
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginTop: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddComment} style={{ marginTop: '8px' }}>
        Add Comment
      </Button>
    </div>
  );
};

export default Comment;
