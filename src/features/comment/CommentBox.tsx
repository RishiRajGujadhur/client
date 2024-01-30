import React, { useState } from 'react';
import { TextField} from '@mui/material';
import useComments from '../../app/hooks/useComments';
import { toast } from 'react-toastify';
import { CommentProps } from '../../models/comment/CommentProps';

const CommentBox: React.FC<CommentProps> = ({ productId }) => {
const { handleAddComment } = useComments(productId);
const [newComment, setNewComment] = useState('');

function handleTextFieldKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddComment(newComment);
      setNewComment('');
      toast.success("Comment Posted!");
    }
  } 
    return (
        <>
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
        </>
    )
}

export default CommentBox;
