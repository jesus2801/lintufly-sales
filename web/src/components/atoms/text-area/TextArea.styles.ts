import styled from '@emotion/styled';

export const TextAreaStyles = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--grey);
    resize: vertical;

    min-height: 30px;
    max-height: 350px;
    font-size: 16px;
    color: var(--black);

    &:focus + div {
      width: 100%;
    }
  }

  div {
    width: 0px;
    height: 1px;
    background-color: var(--blue);
    transform: translateY(-1px);

    transition: width 300ms ease;
  }
`;
