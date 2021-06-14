import React from 'react';

import BusinessSection from '@organisms/register/business-section/BusinessSection';
import PhotosSection from '@organisms/register/photos-section/PhotosSection';
import SubmitSection from '@organisms/register/submit-section/SubmitSection';
import AdminSection from '@organisms/register/admin-section/AdminSection';

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
