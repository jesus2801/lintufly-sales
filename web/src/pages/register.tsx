import React from 'react';

import Layout from '@templates/Layout';
import BusinessSection from '@organisms/login/business-section/BusinessSection';

const Register = () => {
  /*
  TODO:
  Company:
  Name
  mail
  currency
  phones
  imgs

  Admin:
  name
  mail
  pass
  */
  return (
    <Layout title="Registrarse">
      <BusinessSection />
    </Layout>
  );
};

export default Register;
