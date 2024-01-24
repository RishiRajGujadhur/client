import React from 'react';
import LoadingComponent from './LoadingComponent';
import { Outlet } from 'react-router-dom';
import HomePage from '../../features/home/Homepage';

interface ConditionalContentProps {
  loading: boolean;
  locationPathname: string;
}

const DisplayLoading: React.FC<ConditionalContentProps> = ({ loading, locationPathname }) => {
  return (
    <>
      {loading ? <LoadingComponent message='Initialising app...' />
        : locationPathname === '/' ? <HomePage />
        : <Outlet />
      }
    </>
  );
};

export default DisplayLoading;
