import styled from '@emotion/styled';

export const FormSectionDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px 30px;

  -webkit-box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);
  -moz-box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);
  box-shadow: 4px 0px 9px 0px rgba(212, 212, 212, 1);

  .logo {
    width: 100%;
  }
`;

export const FormDiv = styled.div`
  width: 100%;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .avatar {
    width: 90px;
    margin-bottom: 30px;
  }
`;

export const LinksDiv = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    font-size: 14px;
    color: var(--black);
  }
`;
