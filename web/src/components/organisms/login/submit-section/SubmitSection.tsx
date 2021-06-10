import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMutation } from '@apollo/client';
import isEmail from 'validator/lib/isEmail';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import { handleLoading, showErr, success } from '@functions/alerts.functions';
import { switchErrorCode } from '@functions/validate.functions';

import firebaseInstance from '@config/firebase.instance';

import { AppCtx } from '@interfaces/context.interfaces';

import { CREATE_BUSINESS } from '@graphql/mutations';

import Button from '@atoms/button/Button';

import { SubmitSectionDiv } from './SubmitSection.styles';
import {
  setBusinessMail,
  setBusinessName,
  setCurrency,
  setImages,
  setMail,
  setName,
  setPass,
  setPhone,
} from '@context/actions/register.actions';

const SubmitSection = () => {
  //extraemos los valores del state
  const { businessMail, businessName, currency, images, mail, name, pass, phone } =
    useSelector((state: AppCtx) => state.register);

  //router para redireccionar cuando se halla registrado
  const router = useRouter();
  //dispatch para disparar los actions
  const dispatch = useDispatch();

  //variables que contiene el valor del recaptcha
  const [notRobotValue, setNotRobotValue] = useState(null as null | string);
  //mutación de graphql para crear la empresa
  const [createBusiness] = useMutation(CREATE_BUSINESS);

  //handler para el evento change del recaptcha
  const handleChange = (value: string | null) => {
    setNotRobotValue(value);
  };

  //handler del evento click del botón principal
  const handleClick = async () => {
    //validamos que los campos no estén vacios
    if (
      businessMail === '' ||
      businessName === '' ||
      currency === '' ||
      mail === '' ||
      name === '' ||
      pass === ''
    ) {
      showErr('Por favor, rellena correctamente todos los campos');
      return;
    }

    //validamos que halla almenos una imagen
    if (images.length === 0) {
      showErr('Por favor, sube al menos una imagen de tu negocio');
      return;
    }

    //validamos que el teléfono no esté en null
    if (phone === null) {
      showErr('Po favor, ingrese un número de teléfono válido');
      return;
    }

    //validamos el correo del usuario
    if (!isEmail(mail)) {
      showErr('El correo electronico de tu usuario es inválido');
      return;
    }

    //validamos el correo de la empresa
    if (!isEmail(businessMail)) {
      showErr('El correo electronico de tu empresa es inválido');
      return;
    }

    //válidamos los carácteres de la contraseña del usuario
    if (pass.length < 6) {
      showErr('Por favor, ingresa una contraseña de mínimo 6 carácteres');
      return;
    }

    //válidamos que el recaptcha no esté en null
    if (!notRobotValue) {
      showErr('Por favor, marca la casilla que indica que no eres un robot');
      return;
    }

    try {
      handleLoading(true, 'Subiendo Fotos, esto puede tardar un poco');

      //subimos las fotos a firebase
      const imagesPaths = [];
      for (let i = 0, n = images.length; i < n; i++) {
        const uploadTask = await firebaseInstance.ref
          .child(`business-images/${v4()}`)
          .put(images[i], {
            contentType: images[i].type,
          });

        //almacenamos el los paths en un array
        imagesPaths.push(uploadTask.metadata.fullPath);
      }

      handleLoading(false);

      handleLoading(true, 'Creando empresa');
      //respuesta de graphql
      await createBusiness({
        variables: {
          businessInput: {
            name: businessName,
            mail: businessMail,
            currency,
            phones: [phone],
            imgs: imagesPaths,
          },
          adminInput: {
            name,
            mail,
            pass,
          },
          recaptcha: notRobotValue,
        },
      });

      //mensaje si todo salió correcto
      success(
        `La empresa ha sido creada exitosamente en nuestra plataforma, 
        te pedimos paciencia mientras nos contactamos contigo para los 
        respectivos pagos, no te preocupes, nos contactaremos muy rápido ;)`,
        () => {
          dispatch(setName(''));
          dispatch(setMail(''));
          dispatch(setPass(''));
          dispatch(setBusinessName(''));
          dispatch(setBusinessMail(''));
          dispatch(setCurrency(''));
          dispatch(setPhone(null));
          dispatch(setImages([]));
          router.push('/');
        },
      );
    } catch (e) {
      //si hay un código de graphql, mostramos su error correspondiente
      if (
        e.ServerError &&
        e.ServerError.result &&
        e.ServerError.result.errors &&
        e.ServerError.result.errors[0] &&
        e.ServerError.result.errors[0].message
      ) {
        showErr(switchErrorCode(e.ServerError.result.errors[0].message));
        return;
      }

      //si el error es desconocido, mostramos este mensaje
      showErr(
        'Lo sentimos, ha ocurrido un error inesperado, por favor intenta más tarde',
      );
    }
  };

  return (
    <SubmitSectionDiv>
      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY!}
        onChange={handleChange}
      ></ReCAPTCHA>

      <Button
        buttonType="submit"
        className="submit-button"
        id="submit-button"
        onClick={handleClick}
      >
        ¡Registrar mi empresa!
      </Button>
    </SubmitSectionDiv>
  );
};

export default SubmitSection;
