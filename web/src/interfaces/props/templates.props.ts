import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export interface AppLayoutProps extends LayoutProps {}
