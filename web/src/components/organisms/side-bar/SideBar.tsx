import Svg from '@atoms/Svg';
import NavSection from '@molecules/nav-section/NavSection';
import { navItems } from '@utils/variables';
import React from 'react';
import { SideBarDiv } from './SideBar.styles';

const SideBar = () => {
  return (
    <SideBarDiv>
      <Svg className="logo" path="/static/icons/imagotipo-1900x1500" />

      {navItems.map((e, i) => (
        <NavSection items={e.items} name={e.name} key={i} />
      ))}
    </SideBarDiv>
  );
};

export default SideBar;
