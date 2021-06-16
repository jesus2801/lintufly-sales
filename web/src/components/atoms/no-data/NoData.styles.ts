import styled from '@emotion/styled';

export const NoDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
  }

  h2 {
    color: var(--black);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 36px;
    margin: 0;

    transform: translateY(-40px);
  }
`;
