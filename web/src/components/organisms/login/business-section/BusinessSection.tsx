import React, { useEffect, useRef, useState } from 'react';
import PhonesInput from 'react-intl-tel-input';

import { CountryResponse } from '@interfaces/libraries/phone.number';

import { preferredCountries } from '@utils/variables';

import Title from '@atoms/title/Title';
import Input from '@atoms/input/Input';
import Svg from '@atoms/Svg';

import { BusinessSectionDiv, FormContainer, FormDiv } from './BusinessSections.styles';
import 'react-intl-tel-input/dist/main.css';
import FormGroup from '@atoms/form-group/FormGroup';

const BusinessSection = () => {
  const firstInput = useRef(null as null | HTMLInputElement);

  const [phone, setPhone] = useState(null as null | string);

  useEffect(() => {
    if (firstInput.current) firstInput.current.focus({ preventScroll: true });
  }, [firstInput]);

  const handlePhoneInputChange = (
    isValid: boolean,
    {}: string,
    {}: CountryResponse,
    completePhone: string,
  ) => {
    if (isValid) {
      setPhone(completePhone);
    } else if (phone !== null) {
      setPhone(null);
    }
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
            />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa el correo de tu empresa:"
            HtmlFor="business-mail"
          >
            <Input placeholder="Correo electronico de la empresa" id="business-mail" />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa la moneda que maneja tu empresa:"
            HtmlFor="currency"
          >
            <Input placeholder="Moneda de la empresa. Ej: USD" id="currency" />
          </FormGroup>

          <FormGroup
            margin="35px"
            label="Ingresa el teléfono de tu empresa:"
            HtmlFor="phone"
          >
            <PhonesInput
              containerClassName="intl-tel-input"
              inputClassName="input-phone"
              preferredCountries={preferredCountries}
              onPhoneNumberChange={handlePhoneInputChange}
              customPlaceholder={() => 'Número de telefono de la empresa'}
              fieldId="phone"
            />
          </FormGroup>
        </FormDiv>
      </FormContainer>
    </BusinessSectionDiv>
  );
};

export default BusinessSection;
