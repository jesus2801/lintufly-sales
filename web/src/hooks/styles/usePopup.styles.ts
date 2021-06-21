import styled from '@emotion/styled';

import { PopupDivProps } from '@interfaces/props/styles.props';

export const DarkDiv = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  visibility: hidden;
  opacity: 0;

  transition: all 300ms ease;

  &.active {
    visibility: visible;
    opacity: 1;
  }
`;

export const PopupDiv = styled.div`
  box-sizing: border-box;
  width: 91%;
  max-width: ${(props: PopupDivProps) => props.theme.maxWidth};
  background-color: #fff;
  border-radius: 5px;

  transform: scale(0.3);

  transition: transform 290ms cubic-bezier(0.34, 1.56, 0.64, 1);

  &.active {
    transform: scale(1);
  }
`;

export const MainDivPopup = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const ContentSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;

  max-height: 80vh;
  overflow-y: auto;
`;

export const ButtonsSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 0 20px;

  button {
    &.close {
      background-color: #fbbfbf;
      color: #ef4444;
      padding: 4px 13px;
      border-radius: 4px;

      border: none;
      outline: none;
      cursor: pointer;
    }
  }
`;
