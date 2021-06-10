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

  .business-form {
    .intl-tel-input,
    .input-phone {
      width: 100%;
    }

    h2 {
      margin: 0;
      margin-bottom: 20px;
    }
  }
`;
