'use client';
import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import withAuthorization from '@/components/auth/withAuthorization';

function SecretPage() {
  return (
    <ContentLayout>
      <p>これは管理者のみが見れるページです。</p>
    </ContentLayout>
  );
}

export default withAuthorization(SecretPage);