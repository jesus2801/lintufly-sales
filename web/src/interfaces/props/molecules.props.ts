import { ReactNode, DetailedHTMLProps } from 'react';

export interface FormDivProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
