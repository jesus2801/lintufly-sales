import React from 'react';

import BannerSection from '@organisms/login/banner-section/BannerSection';
import FormSection from '@organisms/login/form-section/FormSection';

import { LoginTemplateDiv } from './Login.template.styles';

const LoginTemplate = () => {
  return (
    <LoginTemplateDiv>
      <FormSection />
      <BannerSection />
    </LoginTemplateDiv>
  );
};

export default LoginTemplate;
