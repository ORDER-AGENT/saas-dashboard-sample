'use client';

import useAuthorization from '@/hooks/useAuthorization';
import React, { ComponentType } from 'react';
import ContentLayout from '../ContentLayout';
import SimpleSpinner from '../loader/SimpleSpinner';

const withAuthorization = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithAuthorizationComponent: React.FC<P> = props => {
    const { isLoading, isAuthorized } = useAuthorization();

    if (isLoading) {
      return (
        <ContentLayout>
          <div className="flex h-full min-h-[calc(100vh-200px)] items-center justify-center">
            <SimpleSpinner />
          </div>
        </ContentLayout>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthorizationComponent;
};

export default withAuthorization; 