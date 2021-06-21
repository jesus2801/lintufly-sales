import React, { useEffect, useRef, useState } from 'react';

import { PopupProps, UsePopupProps } from '@interfaces/props/hooks.props';

import {
  DarkDiv,
  PopupDiv,
  ButtonsSection,
  ContentSection,
  MainDivPopup,
} from './styles/usePopup.styles';

const usePopup = ({ maxWidth = '1150px' }: UsePopupProps) => {
  const popupRef = useRef(null as null | HTMLDivElement);
  const darkDivRef = useRef(null as null | HTMLDivElement);
  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (popupRef.current && darkDivRef.current && state) {
        popupRef.current.classList.toggle('active');
        darkDivRef.current.classList.toggle('active');
      }
    }, 40);
  }, [state]);

  const handleCloseClick = () => {
    if (popupRef.current && darkDivRef.current) {
      popupRef.current.classList.toggle('active');
      darkDivRef.current.classList.toggle('active');
    }

    setTimeout(() => {
      setState(false);
    }, 300);
  };

  return {
    Popup: ({ children }: PopupProps) => (
      <DarkDiv ref={darkDivRef} onClick={handleCloseClick}>
        <PopupDiv
          onClick={(e) => e.stopPropagation()}
          ref={popupRef}
          theme={{ maxWidth }}
        >
          <MainDivPopup>
            <ContentSection>{children}</ContentSection>
            <ButtonsSection>
              <button className="close" onClick={handleCloseClick}>
                Cerrar
              </button>
            </ButtonsSection>
          </MainDivPopup>
        </PopupDiv>
      </DarkDiv>
    ),
    state,
    setState,
  };
};

export default usePopup;
