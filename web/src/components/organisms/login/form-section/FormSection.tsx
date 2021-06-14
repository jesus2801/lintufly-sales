import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import isEmail from 'validator/lib/isEmail';
import Link from 'next/link';

import { handleLoading, showErr } from '@functions/alerts.functions';
import { handlerRequestErr } from '@functions/validate.functions';

import FormGroup from '@atoms/form-group/FormGroup';
import Button from '@atoms/button/Button';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import { LOGIN_QUERY } from '@graphql/mutations';

import { FormDiv, FormSectionDiv, LinksDiv } from './FormSection.styles';
import { useRouter } from 'next/router';
import { setUserPayload } from '@context/actions/employee.actions';
import { useDispatch } from 'react-redux';

const FormSection = () => {
  //state que contiene los datos de logueo
  const [loginData, setLoginData] = useState({
    mail: '',
    pass: '',
  });

  //email y contraseña del state
  const { mail, pass } = loginData;

  //query para el logueo
  const [login] = useMutation(LOGIN_QUERY);

  //router para redireccionar en caso de éxito
  const router = useRouter();
  //dispatch para disparar actions
  const dispatch = useDispatch();

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

    try {
      handleLoading(true, 'Verificando datos');

      //ejecutamos la consulta
      const response = await login({
        variables: {
          input: {
            mail,
            pass,
          },
        },
      });

      handleLoading(false);

      localStorage.setItem('token', response.data.loginEmployee.token);
      dispatch(setUserPayload(response.data.loginEmployee.payload));
      router.push('/app');
    } catch (e) {
      handlerRequestErr(e);
    }
  };

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
