import React from 'react';

import BusinessSection from '@organisms/login/business-section/BusinessSection';
import PhotosSection from '@organisms/login/photos-section/PhotosSection';
import SubmitSection from '@organisms/login/submit-section/SubmitSection';
import AdminSection from '@organisms/login/admin-section/AdminSection';

import Layout from '@templates/Layout';

const Register = () => {
  return (
    <Layout title="Registrarse">
      <BusinessSection />

      <PhotosSection />

      <AdminSection />

      <SubmitSection />
    </Layout>
  );
};

export default Register;
