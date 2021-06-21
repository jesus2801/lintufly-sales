import styled from '@emotion/styled';

export const NavSectionDiv = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin-top: 45px;
  padding: 0;

  h2 {
    color: var(--black);
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

export const ItemLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;

  cursor: pointer;
  transition: all 300ms ease;

  &:hover, &.active {
    background-color: var(--grey);
  }

  &:active {
    transform: scale(0.94);
  }

  img {
    width: 33px;
    margin-right: 8px;
  }

  p {
    color: var(--black);
    font-size: 17px;
  }
`;
