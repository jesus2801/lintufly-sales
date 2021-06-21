import { CompleteProduct } from '@interfaces/states';
import { ReactNode, DetailedHTMLProps } from 'react';

export interface FormDivProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export interface NavSectionProps {
  name: string;
  items: { name: string; img: string; link: string }[];
  location: string;
}

export interface ProductCardProps {
  product: CompleteProduct;
  deleteProductOfHook: (_id: string) => void;
}
