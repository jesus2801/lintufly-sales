import { CompleteProduct } from '@interfaces/states';
import { ReactNode, DetailedHTMLProps } from 'react';

export interface FormDivProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export interface NavSectionProps {
  name: string;
  items: { name: string; img: string; link: string }[];
}

export interface ProductCardProps {
  product: CompleteProduct;
}
