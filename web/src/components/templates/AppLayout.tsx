import { useSelector } from 'react-redux';
import React from 'react';

import { AppLayoutProps } from '@interfaces/props/templates.props';

import { AppCtx } from '@interfaces/context.interfaces';

import Login from '@pages/auth/login';

import Layout from './Layout';

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const { payload } = useSelector((state: AppCtx) => state.employee);

  return payload ? <Layout title={title} children={children}></Layout> : <Login />;
};

export default AppLayout;
