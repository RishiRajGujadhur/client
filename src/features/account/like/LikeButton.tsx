import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import agent from '../../../app/api/agent';
 
interface LikeButtonProps {
  productId: number;
  initialLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ productId, initialLiked }) => {
    debugger;
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    // Fetch the initial liked status from the server based on the user's information.
    const fetchInitialLikedStatus = async () => {
      try {
        const response = await agent.Like.userLiked(productId);
        setLiked(response);
      } catch (error) {
        console.error('Error fetching initial liked status:', error);
      }
    };

    fetchInitialLikedStatus();
  }, [productId]);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await agent.Like.unlikeProduct(productId);
      } else {
        await agent.Like.createLike(productId);
      }

      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  return (
    <Tooltip title={liked ? 'Unlike' : 'Like'} arrow>
      <IconButton color={liked ? 'secondary' : 'default'} onClick={handleLikeToggle}>
        {liked ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
