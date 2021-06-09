import Button from '@atoms/button/Button';
import Svg from '@atoms/Svg';
import Title from '@atoms/title/Title';
import React, { ChangeEvent, useRef } from 'react';
import { PhotosCtn, PhotosSectionDiv } from './PhotosSection.styles';



const PhotosSection = () => {
  const inputRef = useRef(null as null | HTMLInputElement);

  const handleClick = () => inputRef.current!.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    
    if(file.type){

    }
  };

  return (
    <PhotosSectionDiv>
      <Title id="photos-section" type="h2" theme={{ size: '42px' }}>
        ¡Agrega fotos de tu negocio!
      </Title>

      <Svg path="/static/images/photos-ilustration" className="photos-image" />

      <PhotosCtn>
        <div className="ctn">
          <div className="card">
            <div className="photo"></div>
          </div>
          <div className="card">
            <div className="photo"></div>
          </div>
        </div>
        <div className="ctn">
          <div className="card">
            <div className="photo"></div>
          </div>
          <div className="card">
            <div className="photo"></div>
          </div>
        </div>
      </PhotosCtn>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        ref={inputRef}
        onChange={handleChange}
      />

      <Button buttonType="submit" onClick={handleClick}>
        Agregar Foto
      </Button>
    </PhotosSectionDiv>
  );
};

export default PhotosSection;
