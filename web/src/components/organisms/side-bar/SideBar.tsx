import React, { useEffect, useState } from 'react';

import NavSection from '@molecules/nav-section/NavSection';

import { navItems } from '@utils/variables';

import Svg from '@atoms/Svg';

import { SideBarDiv } from './SideBar.styles';

const SideBar = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(window.location.pathname);
    const element = document.getElementById(window.location.pathname);

    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <SideBarDiv>
      <Svg className="logo" path="/static/icons/imagotipo-1900x1500" />

      {navItems.map((e, i) => (
        <NavSection location={location} items={e.items} name={e.name} key={i} />
      ))}
    </SideBarDiv>
  );
};

export default SideBar;
