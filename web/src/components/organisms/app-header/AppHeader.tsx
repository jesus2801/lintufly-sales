import { AppCtx } from '@interfaces/context.interfaces';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderDiv, AvatarImg, UserNameParagraph } from './AppHeader.styles';

const roleCases = { employee: 'Empleado', admin: 'Administrador' };

const AppHeader = () => {
  const { payload } = useSelector((state: AppCtx) => state.employee);

  return (
    <AppHeaderDiv>
      <UserNameParagraph>
        {payload!.name} <span>{roleCases[payload!.role]}</span>
      </UserNameParagraph>

      <AvatarImg src={`/static/avatars/${payload!.avatar}.webp`} />
    </AppHeaderDiv>
  );
};

export default AppHeader;
