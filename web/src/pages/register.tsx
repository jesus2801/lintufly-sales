import React from 'react';

import Layout from '@templates/Layout';
import BusinessSection from '@organisms/login/business-section/BusinessSection';
import PhotosSection from '@organisms/login/photos-section/PhotosSection';

const Register = () => {
  /*
  TODO:
  Company:
  imgs

  Admin:
  name
  mail
  pass
  */
  return (
    <Layout title="Registrarse">
      <BusinessSection />
      <PhotosSection />
    </Layout>
  );
};

export default Register;
