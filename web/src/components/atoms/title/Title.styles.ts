import styled from '@emotion/styled';
import { HeadersProps } from '@interfaces/props/styles.props';

const baseStyles = `
color: var(--black);
font-family: 'Montserrat', sans-serif;
font-weight: 600;
`;

export const H1 = styled.h1`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;

export const H2 = styled.h2`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;

export const H3 = styled.h3`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;

export const H4 = styled.h4`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;

export const H5 = styled.h5`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;

export const H6 = styled.h6`
  ${baseStyles}
  size: ${(props: HeadersProps) => props.theme.size || 'unset'};
  text-transform: ${(props: HeadersProps) =>
    props.theme.transform || 'unset'};
`;
