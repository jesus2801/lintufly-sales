import styled from '@emotion/styled';

export const ProductPopupDiv = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PopupTitle = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center;

  font-family: 'Montserrat', sans-serif;
  color: var(--black);
  font-size: 32px;
  font-weight: 400;
  margin: 8px 0 18px 0;
`;

export const ImagesGrid = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;

  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

export const ImageScreen = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &.add-button {
    background-color: #dedede;
    opacity: 0.65;

    img {
      width: 25%;
      transition: width 300ms ease;
    }

    &:hover {
      img {
        width: 30%;
      }
    }
  }

  &.normal-image {
    overflow: hidden;

    img {
      border-radius: 4px;
      width: 100%;
      transition: transform 300ms ease;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
`;
