import styled from '@emotion/styled';

export const ProductCardDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 6px;

  -webkit-box-shadow: 2px 4px 10px 0px rgba(217, 217, 217, 1);
  -moz-box-shadow: 2px 4px 10px 0px rgba(217, 217, 217, 1);
  box-shadow: 2px 4px 10px 0px rgba(217, 217, 217, 1);

  .img-ctn {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;

    p {
      position: absolute;
      margin: 0 0 5px 8px;
      background-color: var(--blue);
      color: #fff;
      padding: 3px 8px;
      border-radius: 100px;

      font-size: 14px;
    }

    img {
      width: 100%;
      border-radius: 6px 6px 0 0;
      min-height: 50px;
    }
  }

  .no-img {
    width: 100%;
    height: 180px;
    border-radius: 6px 6px 0 0;
    background-color: var(--purple);
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;

    h2 {
      font-family: 'Montserrat', sans-serif;
      color: var(--black);
      font-weight: 600;
      margin: 0;
      font-size: 20px;
    }

    .desc {
      width: 100%;
      color: var(--black);
      font-size: 14px;
    }

    .buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .icon {
        width: 35px;
        height: 35px;
        border-radius: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.red {
          background-color: var(--red);
        }

        &.purple {
          background-color: var(--purple);
        }

        &.black {
          background-color: var(--black);
        }

        img {
          width: 55%;
          height: 55%;
        }
      }
    }
  }
`;
