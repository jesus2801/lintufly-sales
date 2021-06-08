export interface TitleTheme {
  size?: string;
  transform?:
    | 'capitalize'
    | 'lowercase'
    | 'none'
    | 'uppercase'
    | 'inherit'
    | 'initial'
    | 'unset';
}

export interface HeadersProps {
  theme: TitleTheme;
}

export interface FormGroupThemeProps {
  theme: {
    margin?: string;
  };
}
