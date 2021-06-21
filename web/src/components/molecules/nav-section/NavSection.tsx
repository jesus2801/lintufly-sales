import Link from 'next/link';
import React from 'react';

import { NavSectionProps } from '@interfaces/props/molecules.props';

import { ItemLi, NavSectionDiv } from './NavSection.styles';

const NavSection = ({ name, items, location }: NavSectionProps) => {
  return (
    <NavSectionDiv>
      <h2>{name}</h2>

      {items.map((e, i) => (
        <Link href={`/app/${e.link}`} key={i}>
          <ItemLi
            className={location === `/app/${e.link}` ? 'active' : ''}
            id={`/app/${e.link}`}
          >
            <img src={e.img} alt="icono" />
            <p>{e.name}</p>
          </ItemLi>
        </Link>
      ))}
    </NavSectionDiv>
  );
};

export default NavSection;
