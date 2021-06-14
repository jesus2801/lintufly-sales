import styled from '@emotion/styled';
import { navWidth } from '@utils/variables';

export const ChildrenDiv = styled.div`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 80px;
  width: calc(100% - ${navWidth});
  padding: 20px;

  overflow-y: auto;
`;
