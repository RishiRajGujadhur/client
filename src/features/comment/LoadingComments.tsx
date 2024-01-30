import React from 'react';
import { List, ListItem, ListItemText, Divider, Avatar, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const LoadingComments: React.FC = () => {
  return (
    <div>
      <List>
        {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" className="comment-item">
              <Avatar>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              </Avatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="subtitle2" component="span">
                      <Skeleton animation="wave" height={10} width="80%" />
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span">
                      <Skeleton animation="wave" height={10} width="60%" />
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <Typography variant="body1" component="span">
                    <Skeleton animation="wave" height={10} width="80%" />
                  </Typography>
                }
              />
            </ListItem>
             
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default LoadingComments;
