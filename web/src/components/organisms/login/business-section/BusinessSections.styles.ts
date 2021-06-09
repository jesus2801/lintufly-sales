import styled from '@emotion/styled';

export const BusinessSectionDiv = styled.div`
  box-sizing: border-box;
  width: 93%;
  margin: 20px auto 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  object {
    box-sizing: border-box;
    width: 50%;
  }
`;

export const FormContainer = styled.div`
  box-sizing: border-box;
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormDiv = styled.div`
  box-sizing: border-box;
  width: 460px;
  background-color: #ffffff;
  border-radius: 8px;

  padding: 25px 50px;

  -webkit-box-shadow: 3px 7px 9px 1px rgba(210, 210, 210, 0.86);
  -moz-box-shadow: 3px 7px 9px 1px rgba(210, 210, 210, 0.86);
  box-shadow: 3px 7px 9px 1px rgba(210, 210, 210, 0.86);

  .intl-tel-input,
  .input-phone {
    width: 100%;
  }

  h2 {
    margin: 0;
    margin-bottom: 20px;
  }
`;
