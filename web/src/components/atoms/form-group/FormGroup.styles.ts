import styled from '@emotion/styled';

import { FormGroupThemeProps } from '@interfaces/props/styles.props';

export const FormGroupDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin-bottom: ${(props: FormGroupThemeProps) => props.theme.margin || '20px'};

  label {
    font-size: 14px;
    color: var(--black);
    margin-bottom: 4px;
  }
`;
