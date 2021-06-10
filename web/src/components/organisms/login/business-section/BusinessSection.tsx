import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//TODO: crear los tipados de este módulo, dado que no están en npm
//@ts-ignore
import PhonesInput from 'react-intl-tel-input';
import isEmail from 'validator/lib/isEmail';

import { CountryResponse } from '@interfaces/libraries/phone.number';
import { AppCtx } from '@interfaces/context.interfaces';

import { preferredCountries } from '@utils/variables';

import FormGroup from '@atoms/form-group/FormGroup';
import Button from '@atoms/button/Button';
import Title from '@atoms/title/Title';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import {
  setBusinessMail,
  setBusinessName,
  setCurrency,
  setPhone,
} from '@context/actions/register.actions';

import { BusinessSectionDiv, FormContainer } from './BusinessSections.styles';
import 'react-intl-tel-input/dist/main.css';
import FormDiv from 'src/components/molecules/FormDiv';

const BusinessSection = () => {
  //referencia del primer input con el fin de hacerle focus cuando cargue la página
  const firstInput = useRef(null as null | HTMLInputElement);
  // número de telefono y nombre de la empresa extraidos del state principal
  const { phone, businessName } = useSelector((state: AppCtx) => state.register);

  //dispatch para disparar actions
  const dispatch = useDispatch();

  //use effect, para que apenas carque la referencia del primer input, hacerle focus
  useEffect(() => {
    if (firstInput.current) firstInput.current.focus({ preventScroll: true });
  }, [firstInput]);

  //hanlder del evento change del número de telefono de la empresa
  const handlePhone = (
    isValid: boolean,
    {}: string,
    {}: CountryResponse,
    completePhone: string,
  ) => {
    //si el teléfono es válido, lo seteamos en el state
    if (isValid) {
      dispatch(setPhone(completePhone));

      //si el teléfono no es válido y está en el state, lo cambiamos por un `null`
    } else if (phone !== null) {
      dispatch(setPhone(null));
    }
  };

  //hanlder del evento change del nombre de la empresa
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    //seteamos el nombre de la empresa en el state principal
    dispatch(setBusinessName(e.currentTarget.value));
  };

  //handler del evento change del email de la empresa
  const handleMail = (e: ChangeEvent<HTMLInputElement>) => {
    //guardamos y seteamos el valor en el state principal
    const value = e.currentTarget.value;
    dispatch(setBusinessMail(value));

    //si el email es válido le quitamos la clase `invalid`
    if (isEmail(value)) {
      e.currentTarget.classList.remove('invalid');
      //si el email es inválido le agregamos la clase `invalid`
    } else {
      e.currentTarget.classList.add('invalid');
    }
  };

  //handler del evento change de la moneda de la empresa
  const handleCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrency(e.currentTarget.value));
  };

  return (
    <BusinessSectionDiv>
      <Svg path="/static/images/business-man" />
      <FormContainer>
        <FormDiv className="business-form">
          <Title>Registra a tu empresa</Title>

          <FormGroup
            margin="35px"
            label="Ingresa el nombre de tu empresa:"
            HtmlFor="business-name"
          >
            <Input
              placeholder="Nombre de la empresa"
              addRef={firstInput}
              id="business-name"
              onChange={handleName}
              value={businessName}
              maxLength={65}
            />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa el correo de tu empresa:"
            HtmlFor="business-mail"
            info={`Con este correo nos comunicaremos contigo 
            para la compra del servicio y también será el que 
            aparecerá a tus clientes cuando quieran comprarte`}
          >
            <Input
              placeholder="Correo electronico de la empresa"
              id="business-mail"
              onChange={handleMail}
              maxLength={55}
            />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa la moneda que maneja tu empresa:"
            HtmlFor="currency"
            info={`Esta es la moneda en la que tu empresa vende a sus clientes, 
            será la moneda predeterminada que saldrá a todos los que 
            quieran comprarte`}
          >
            <Input
              placeholder="Moneda de la empresa. Ej: USD"
              onChange={handleCurrency}
              maxLength={25}
              id="currency"
            />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa el teléfono de tu empresa:"
            HtmlFor="phone"
            info={`Con este teléfono tanto nosotros como tus clientes 
            podremos contactarnos con tu empresa en caso de requerirlo, 
            si tienes más de uno, no te preocupes, más adelante puedes agregar más`}
          >
            <PhonesInput
              containerClassName="intl-tel-input"
              inputClassName="input-phone"
              preferredCountries={preferredCountries}
              onPhoneNumberChange={handlePhone}
              customPlaceholder={() => 'Número de telefono de la empresa'}
              fieldId="phone"
            />
          </FormGroup>

          <Button
            buttonType="submit"
            onClick={() => {
              //mandamos la pantalla del usuario a la siguiente sección
              document
                .getElementById('photos-section')!
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Siguiente paso
          </Button>
        </FormDiv>
      </FormContainer>
    </BusinessSectionDiv>
  );
};

export default BusinessSection;
