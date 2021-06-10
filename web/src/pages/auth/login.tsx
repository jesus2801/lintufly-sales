import React from 'react';

import LoginTemplate from '@templates/login/Login.template';
import Layout from '@templates/Layout';

const login = () => {
  return (
    <Layout title="Login">
      <LoginTemplate />
    </Layout>
  );
};

export default login;
