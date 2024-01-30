import React from 'react';
import { List, ListItem, ListItemText, Divider, Avatar, Typography } from '@mui/material';
import useComments from '../../app/hooks/useComments';
import CommentPagination from './CommentPagination';
import { CommentProps } from '../../models/comment/CommentProps';
import moment from 'moment';
import LoadingComments from './LoadingComments';

const Comment: React.FC<CommentProps> = ({ productId }) => {
  const { comments, commentsLoaded, handlePageChange, metaData } = useComments(productId);

  if (!commentsLoaded) {
    return <LoadingComments></LoadingComments>;
  }

  return (
    <div>
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" className="comment-item">
              <Avatar src={comment.username} alt={comment.username} />
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="subtitle2" component="span" sx={{ ml: 2 }}>
                      {comment.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 2 }}>
                      {moment(comment.createdAt).fromNow()}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <Typography variant="body1" component="span" sx={{ ml: 2 }}>
                  {comment.text}
                  </Typography>
                }
              />
            </ListItem>
           
          </React.Fragment>
        ))}
      </List>
      <CommentPagination metaData={metaData} onPageChange={handlePageChange} productId={productId} />
    </div>
  );
};

export default Comment;
