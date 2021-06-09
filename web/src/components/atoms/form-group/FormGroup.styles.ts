import styled from '@emotion/styled';

import { FormGroupThemeProps } from '@interfaces/props/styles.props';

export const FormGroupDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin-bottom: ${(props: FormGroupThemeProps) => props.theme.margin || '20px'};

  .label-ctn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;

    label {
      font-size: 14px;
      color: var(--black);
      margin-right: 4px;
    }

    img {
      width: 14px;
      margin-right: 8px;
    }
  }
`;
