import React from 'react';
import Link from 'next/link';

import { NavSectionProps } from '@interfaces/props/molecules.props';

import { ItemLi, NavSectionDiv } from './NavSection.styles';

const NavSection = ({ name, items }: NavSectionProps) => {
  return (
    <NavSectionDiv>
      <h2>{name}</h2>

      {items.map((e, i) => (
        <Link href={`/app/${e.link}`} key={i}>
          <ItemLi>
            <img src={e.img} alt="icono" />
            <p>{e.name}</p>
          </ItemLi>
        </Link>
      ))}
    </NavSectionDiv>
  );
};

export default NavSection;
