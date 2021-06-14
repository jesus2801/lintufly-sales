import styled from '@emotion/styled';

import { navWidth } from '@utils/variables';

export const SideBarDiv = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: ${navWidth};
  height: 100vh;
  padding: 20px 15px;

  background-color: #ffffff;
  overflow-y: auto;

  -webkit-box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);
  -moz-box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);
  box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);

  .logo {
    width: 100%;
    min-height: 66px;
    max-height: 67px;
  }
`;
