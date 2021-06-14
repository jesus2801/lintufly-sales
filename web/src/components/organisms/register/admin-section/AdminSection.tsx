import React, { ChangeEvent } from 'react';

import FormGroup from '@atoms/form-group/FormGroup';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import FormDiv from '@molecules/form-div/FormDiv';

import { AdminSectionDiv, FormSection } from './AdminSection.styles';
import Title from '@atoms/title/Title';
import Button from '@atoms/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setMail, setName, setPass } from '@context/actions/register.actions';
import { AppCtx } from '@interfaces/context.interfaces';

const AdminSection = () => {
  const { mail, pass, name } = useSelector((state: AppCtx) => state.register);

  const dispatch = useDispatch();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.currentTarget.value));
  };

  const handleMail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMail(e.currentTarget.value));
  };
  const handlePass = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPass(e.currentTarget.value));
  };

  return (
    <AdminSectionDiv>
      <FormSection>
        <FormDiv>
          <Title>Tú información en la plataforma</Title>

          <FormGroup HtmlFor="user-name" label="Ingresa tu nombre completo:">
            <Input
              placeholder="Tu Nombre"
              maxLength={70}
              id="user-name"
              onChange={handleName}
              value={name}
            />
          </FormGroup>

          <FormGroup HtmlFor="user-mail" label="Ingresa tu email:">
            <Input
              placeholder="Correo electronico"
              maxLength={55}
              id="user-mail"
              onChange={handleMail}
              value={mail}
            />
          </FormGroup>

          <FormGroup HtmlFor="user-pass" label="Ingresa tu contraseña:">
            <Input
              type="password"
              placeholder="Tu contraseña"
              maxLength={150}
              id="user-pass"
              onChange={handlePass}
              value={pass}
            />
          </FormGroup>

          <Button
            buttonType="submit"
            onClick={() => {
              //avanzar a la siguiente sección
              document
                .getElementById('submit-button')!
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ¡Ir al último paso!
          </Button>
        </FormDiv>
      </FormSection>

      <Svg path="/static/images/man-mirror" />
    </AdminSectionDiv>
  );
};

export default AdminSection;
