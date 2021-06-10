import React, { ChangeEvent, useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import Link from 'next/link';

import FormGroup from '@atoms/form-group/FormGroup';
import Button from '@atoms/button/Button';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import { FormDiv, FormSectionDiv, LinksDiv } from './FormSection.styles';
import { handleLoading, showErr } from '@functions/alerts.functions';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_QUERY } from '@graphql/queries';
import { handlerRequestErr } from '@functions/validate.functions';

const FormSection = () => {
  //state que contiene los datos de logueo
  const [loginData, setLoginData] = useState({
    mail: '',
    pass: '',
  });

  //email y contraseña del state
  const { mail, pass } = loginData;

  //query para el logueo
  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY);

  //handler del evento change para los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  //handler del evento click del botón del formulario
  const handleClick = async () => {
    //válidamos que los campos no estén vacios
    if (mail.trim() === '' || pass.trim() === '') {
      showErr('Por favor, rellene correctamente todos los campos');
      return;
    }

    //validamos el correo electronico
    if (!isEmail(mail)) {
      showErr('El correo electronico ingresado tiene un formato inválido');
      return;
    }

    //válidamos la longitud de la contraseña
    if (pass.length < 6) {
      showErr('Por favor, la contraseña debe de tener un mínimo de 6 carácteres');
      return;
    }

    //ejecutamos la consulta
    login({
      variables: {
        input: {
          mail,
          pass,
        },
      },
    });
  };

  //use effect para si está cargando la consulta, se muestre un loader
  useEffect(() => {
    if (loading) handleLoading(true, 'Verificando datos');
    else handleLoading(false);
  }, [loading]);

  //use effect para cuando los datos han sido entregados setear token y redireccionar
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  //use effect por si hay algún error, mostrarlo
  useEffect(() => {
    if (error) handlerRequestErr(error);
  }, [error]);

  return (
    <FormSectionDiv>
      <Svg className="logo" path="/static/icons/imagotipo-1900x1500" />

      <FormDiv>
        <Svg className="avatar" path="/static/icons/avatar-woman" />
        <FormGroup margin="30px" label="Ingresa tu correo electronico:" HtmlFor="mail">
          <Input
            placeholder="Correo electronico"
            id="mail"
            name="mail"
            onChange={handleChange}
            value={mail}
          />
        </FormGroup>

        <FormGroup margin="30px" label="Ingresa tu contraseña" HtmlFor="pass">
          <Input
            type="password"
            placeholder="Contraseña"
            id="pass"
            name="pass"
            onChange={handleChange}
            value={pass}
          />
        </FormGroup>

        <Button buttonType="submit" onClick={handleClick}>
          Ingresar
        </Button>

        <LinksDiv>
          <Link href="#!">¿Olvidaste tu contraseña?</Link>
          <Link href="/auth/signup">¿No tienes una cuenta?</Link>
        </LinksDiv>
      </FormDiv>
    </FormSectionDiv>
  );
};

export default FormSection;
