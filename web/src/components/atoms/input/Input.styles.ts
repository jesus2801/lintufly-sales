import styled from '@emotion/styled';

export const InputStyles = styled.div`
  box-sizing: border-box;
  width: 100%;

  img,
  object {
    width: 20px;
    height: 20px;
    position: absolute;
    transform: translateY(4px);
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border: none;
    outline: none;
    color: var(--black);
    border-bottom: 1px solid var(--grey);

    padding: 4px;

    &:focus + div {
      width: 100%;
    }

    &.icon {
      padding: 4px 4px 4px 25px;
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
