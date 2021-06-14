import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { AppLayoutProps } from '@interfaces/props/templates.props';

import { AppCtx } from '@interfaces/context.interfaces';

import Login from '@pages/auth/login';

import Layout from '../Layout';
import { handleLoading } from '@functions/alerts.functions';
import { useLazyQuery } from '@apollo/client';
import { VIEWER } from '@graphql/queries';
import { handlerRequestErr } from '@functions/validate.functions';
import { setUserPayload } from '@context/actions/employee.actions';
import SideBar from '@organisms/side-bar/SideBar';
import { ChildrenDiv } from './AppLayout.styles';
import AppHeader from '@organisms/app-header/AppHeader';

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const { payload } = useSelector((state: AppCtx) => state.employee);
  const [viewer, { data, loading, error }] = useLazyQuery(VIEWER);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!payload) viewer();
  }, []);

  useEffect(() => {
    if (loading) handleLoading(true, 'Verificando credenciales');
    else handleLoading(false);
  }, [loading]);

  useEffect(() => {
    if (data) dispatch(setUserPayload(data.viewer));
  }, [data]);

  useEffect(() => {
    if (error) handlerRequestErr(error);
  }, [error]);

  return payload ? (
    <Layout title={title}>
      <SideBar />
      <AppHeader />
      <ChildrenDiv>{children}</ChildrenDiv>
    </Layout>
  ) : (
    <Login />
  );
};

export default AppLayout;
