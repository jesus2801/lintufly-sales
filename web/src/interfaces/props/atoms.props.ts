import type { DetailedHTMLProps, ReactNode, MutableRefObject } from 'react';
import { TitleTheme } from './styles.props';

export interface SvgProps
  extends DetailedHTMLProps<
    React.ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement
  > {
  path: string;
}

export interface TitleProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  theme?: TitleTheme;
  children: ReactNode;
}

export interface InputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactNode;
  addRef?: MutableRefObject<HTMLInputElement | null>;
}

export interface FormGroupProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  HtmlFor?: string;
  margin?: string;
  info?: string;
  children: ReactNode;
}

export interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType: 'submit' | 'small';
  children: ReactNode;
}

export interface TextAreaProps
  extends DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  children?: ReactNode;
}
