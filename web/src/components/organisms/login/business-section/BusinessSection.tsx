import React, { ChangeEvent, useEffect, useRef } from 'react';
//TODO: crear los tipados de este módulo, dado que no están en npm
//@ts-ignore
import PhonesInput from 'react-intl-tel-input';
import isEmail from 'validator/lib/isEmail';

import { CountryResponse } from '@interfaces/libraries/phone.number';

import { preferredCountries } from '@utils/variables';

import FormGroup from '@atoms/form-group/FormGroup';
import Button from '@atoms/button/Button';
import Title from '@atoms/title/Title';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import { BusinessSectionDiv, FormContainer, FormDiv } from './BusinessSections.styles';
import 'react-intl-tel-input/dist/main.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBusinessMail,
  setBusinessName,
  setCurrency,
  setPhone,
} from '@context/actions/register.actions';
import { AppCtx } from '@interfaces/context.interfaces';

const BusinessSection = () => {
  const firstInput = useRef(null as null | HTMLInputElement);
  const { phone, businessName } = useSelector((state: AppCtx) => state.register);

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstInput.current) firstInput.current.focus({ preventScroll: true });
  }, [firstInput]);

  const handlePhone = (
    isValid: boolean,
    {}: string,
    {}: CountryResponse,
    completePhone: string,
  ) => {
    if (isValid) {
      dispatch(setPhone(completePhone));
    } else if (phone !== null) {
      dispatch(setPhone(null));
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBusinessName(e.currentTarget.value));
  };

  const handleMail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch(setBusinessMail(value));

    if (isEmail(value)) {
      e.currentTarget.classList.remove('invalid');
    } else {
      e.currentTarget.classList.add('invalid');
    }
  };

  const handleCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrency(e.currentTarget.value));
  };

  return (
    <BusinessSectionDiv>
      <Svg path="/static/images/business-man" />
      <FormContainer>
        <FormDiv>
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
