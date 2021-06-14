import styled from '@emotion/styled';
import { navWidth } from '@utils/variables';

export const AppHeaderDiv = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - ${navWidth});
  padding: 10px 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: var(--purple);
  z-index: 2;
`;

export const UserNameParagraph = styled.p`
  color: #fff;
  font-size: 17px;

  span {
    background-color: #fff;
    border-radius: 4px;
    color: var(--black);
    font-size: 15px;
    padding: 4px 7px;
  }
`;

export const AvatarImg = styled.img`
  width: 60px;
`;
