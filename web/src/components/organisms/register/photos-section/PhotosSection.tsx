import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent, useRef } from 'react';

import { setImages } from '@context/actions/register.actions';

import { AppCtx } from '@interfaces/context.interfaces';

import { showErr } from '@functions/alerts.functions';

import Button from '@atoms/button/Button';
import Title from '@atoms/title/Title';
import Svg from '@atoms/Svg';

import { DescriptionText, PhotosCtn, PhotosSectionDiv } from './PhotosSection.styles';
import { acceptedFormats } from '@utils/variables';
import { validateImageFile } from '@functions/validate.functions';

const PhotosSection = () => {
  const { images } = useSelector((state: AppCtx) => state.register);

  //referencia del input de tipo file
  const inputRef = useRef(null as null | HTMLInputElement);
  //referencias de los contenedores de las fotos
  const firstPhoto = useRef(null as null | HTMLDivElement);
  const secondPhoto = useRef(null as null | HTMLDivElement);
  const thirdPhoto = useRef(null as null | HTMLDivElement);
  const fourthPhoto = useRef(null as null | HTMLDivElement);

  //dispatch para disparar actions
  const dispatch = useDispatch();

  //handlear el evento click del boton de agregar imagen
  const handleClick = () => inputRef.current!.click();

  //handler el evento change del input tipo file
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //número de fotos actuales
    const photosNumber = images.length;

    //si ya hay 4 fotos, no se le permite subir más
    if (photosNumber === 4) {
      showErr('Lo sentimos, ya has subido las 4 fotos máximas permitidas');
      return;
    }

    //archivo subido
    const file = e.currentTarget.files![0];

    //validamos el archivo
    const response = validateImageFile(file, { generateUrl: true });
    //si es inválido no seguimos
    if (!response.isValid) return;

    //creamos el background con la url provisional de la imagen
    const background = `url("${response.url}")`;

    //dependiendo de cuantas imagenes hallan, la ubico en su respectiva
    //tarjeta
    switch (photosNumber) {
      case 0:
        firstPhoto.current!.style.backgroundImage = background;
        dispatch(setImages([...images, file]));
        break;

      case 1:
        secondPhoto.current!.style.backgroundImage = background;
        dispatch(setImages([...images, file]));
        break;

      case 2:
        thirdPhoto.current!.style.backgroundImage = background;
        dispatch(setImages([...images, file]));
        break;

      case 3:
        fourthPhoto.current!.style.backgroundImage = background;
        dispatch(setImages([...images, file]));
        break;

      default:
        return;
    }
  };

  //handlear el evento click de las fotos, para eliminarlas
  const handleDelete = (imageNumber: number) => {
    //los posibles casos de las tarjetas
    const cases: { [k: number]: HTMLDivElement } = {
      '0': firstPhoto.current!,
      '1': secondPhoto.current!,
      '2': thirdPhoto.current!,
      '3': fourthPhoto.current!,
    };

    //la tarjeta actual
    const photo = cases[imageNumber];
    //si la tarjeta actual no tiene una foto, retrocedemos
    if (photo.style.backgroundImage === '') return;

    //hago una copia del array de fotos
    const copy = images.slice();
    //elimino la foto clickeada del array
    copy.splice(imageNumber, 1);

    //actualizo el state con el nuevo array
    dispatch(setImages(copy));

    //recorro desde la tarjeta actual hasta la última para actualizarlas
    for (let i = imageNumber, n = images.length; i < n; i++) {
      //si la siguiente tarjeta no existe o no tiene imagen significa que hasta aquí
      //es el ciclo y la tarjeta actual debe de quedar vacia
      if (!cases[i + 1] || cases[i + 1].style.backgroundImage === '') {
        cases[i].style.backgroundImage = '';
        continue;
      }

      //seteo la foto de la tarjeta actual con la foto de la tarjeta que le sigue
      cases[i].style.backgroundImage = cases[i + 1].style.backgroundImage;
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
            <div className="photo" ref={firstPhoto} onClick={() => handleDelete(0)}></div>
          </div>
          <div className="card">
            <div
              className="photo"
              ref={secondPhoto}
              onClick={() => handleDelete(1)}
            ></div>
          </div>
        </div>
        <div className="ctn">
          <div className="card">
            <div className="photo" ref={thirdPhoto} onClick={() => handleDelete(2)}></div>
          </div>
          <div className="card">
            <div
              className="photo"
              ref={fourthPhoto}
              onClick={() => handleDelete(3)}
            ></div>
          </div>
        </div>
      </PhotosCtn>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        ref={inputRef}
        onChange={handleChange}
      />

      <DescriptionText>
        <p>
          Agrega entre 1 a 4 fotos para que todos podamos conocer mejor tu negocio, ya
          sean tus locales, tu logo, principal producto, una foto con tus empleados, etc.
          <br />
          <br />
          <b>Tip</b>: Para eliminar alguna foto, ¡sólo haz click sobre ella y listo!
        </p>
      </DescriptionText>

      <Button buttonType="submit" onClick={handleClick}>
        Agregar Foto
      </Button>
    </PhotosSectionDiv>
  );
};

export default PhotosSection;
