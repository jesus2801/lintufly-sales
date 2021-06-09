import styled from '@emotion/styled';

export const PhotosSectionDiv = styled.div`
  width: 90%;
  margin: 50px auto 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .photos-image {
    max-width: 100%;
  }

  input[type='file'] {
    display: none;
  }
`;

export const PhotosCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 240px;
  margin-bottom: 40px;

  .ctn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .card {
      position: relative;
      box-sizing: border-box;
      width: 380px;
      height: 300px;
      border-radius: 6px;
      background-color: #fff;

      -webkit-box-shadow: 2px 6px 9px 0px rgba(217, 217, 217, 1);
      -moz-box-shadow: 2px 6px 9px 0px rgba(217, 217, 217, 1);
      box-shadow: 2px 6px 9px 0px rgba(217, 217, 217, 1);
      padding: 20px 20px 40px 20px;
      z-index: 2;

      &:nth-of-type(2) {
        position: absolute;
        transform: rotate(25deg) translate(20px, -160px);
        z-index: 1;
      }

      .photo {
        width: 100%;
        background-color: var(--grey);
        height: 100%;
        border-radius: 6px;
      }
    }
  }
`;
