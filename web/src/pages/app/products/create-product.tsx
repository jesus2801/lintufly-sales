import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import isNumber from 'validator/lib/isNumeric';
import { useMutation } from '@apollo/client';
import { v4 } from 'uuid';

import { handlerRequestErr, isEmpty } from '@functions/validate.functions';
import AppLayout from '@templates/app-layout/AppLayout';

import { handleLoading, showErr, success } from '@functions/alerts.functions';

import firebaseInstance from '@config/firebase.instance';

import FormGroup from '@atoms/form-group/FormGroup';
import TextArea from '@atoms/text-area/TextArea';
import Button from '@atoms/button/Button';
import Input from '@atoms/input/Input';

import { CREATE_PRODUCT } from '@graphql/mutations';

import { acceptedFormats, cacheTag } from '@utils/variables';

import FormDiv from '@molecules/form-div/FormDiv';

const CreateProduct = () => {
  //referencia del primer input con el fin de hacerle focus
  const firstInputRef = useRef(null as null | HTMLInputElement);
  //referencia del input que contiene la imagen del producto
  const inputFileRef = useRef(null as null | HTMLInputElement);
  //referencia de la etiqueta img en donde se muestra la imagen del producto
  const imageRef = useRef(null as null | HTMLImageElement);

  //mutacion para crear el producto
  const [createProduct] = useMutation(CREATE_PRODUCT);

  //state inicial de la información del producto
  const initState = {
    name: '',
    price: '',
    desc: '',
  };
  const [data, setData] = useState(initState);
  //state que contiene la imagen del producto
  const [file, setFile] = useState(null as null | File);

  // propiedades de la información del producto
  const { name, desc, price } = data;

  //use effect para hacerle focus al primer input
  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus({ preventScroll: true });
  }, [firstInputRef]);

  //handlear cuando se le hace click al boton de insertar imagen
  const handleFileClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  //handlear cuando se ingresa un archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.currentTarget.files![0];

    //validamso que sea una imagen válida
    if (acceptedFormats.indexOf(file.type) === -1) {
      setFile(null);
      showErr('Por favor, ingresa un archivo con formato permitido');
      return;
    }

    //válidamos que no se pase de los 5MB
    if (file.size > 5000000) {
      setFile(null);
      showErr('Por favor, ingresa un archivo menor a 5MB');
      return;
    }

    //seteamos el archivo en el state
    setFile(file);
  };

  //cuando el archivo cambie, lo mostramos u ocultamos según corresponda
  useEffect(() => {
    if (imageRef.current) {
      if (file) {
        const blob = new Blob([file]);
        const URL = window.URL || window.webkitURL;
        imageRef.current.style.width = '100%';
        imageRef.current.style.marginTop = '20px';
        imageRef.current.src = URL.createObjectURL(blob);
      } else {
        imageRef.current.src = '';
        imageRef.current.style.marginTop = '0';
      }
    }
  }, [file]);

  //handle change de los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  //handle submit del boton de crear producto
  const handleSubmit = async () => {
    //validamos que no hallan campos vacios
    if (isEmpty(name, price)) {
      showErr('Por favor, el nombre y el precio son campos requeridos');
      return;
    }

    //validamos que el precio sea formato numérico
    if (!isNumber(price)) {
      showErr('Por favor, ingrese un precio válido');
      return;
    }

    //validamos que el precio no sea menor o igual a 0
    if (parseFloat(price) <= 0) {
      showErr('Por favor ingrese un precio válido');
      return;
    }

    try {
      //si hay imagen, la subimos a firebase
      let imgName: null | string = null;
      if (file) {
        handleLoading(true, 'Subiendo Foto');
        const uploadTask = await firebaseInstance.storage
          .ref()
          .child(`products-images/${v4()}${file.name}`)
          .put(file, {
            contentType: file.type,
            cacheControl: cacheTag,
          });
        handleLoading(false);

        imgName = uploadTask.metadata.fullPath;
      }

      //creamos el producto
      handleLoading(true, 'Creando Producto');
      await createProduct({
        variables: {
          input: {
            name,
            price: parseFloat(price),
            imgs: imgName ? [imgName] : [],
            desc: desc.trim() === '' ? undefined : desc,
          },
        },
      });
      handleLoading(false);

      //si todo sale bien muestro una alerta y limpio el state
      success('El producto ha sido creado exitosamente');
      setData(initState);
      setFile(null);
    } catch (e) {
      handlerRequestErr(e);
    }
  };

  return (
    <AppLayout title="Crear Producto">
      <FormDiv className="m-center">
        <FormGroup label="Nombre del Producto:" HtmlFor="product-name">
          <Input
            placeholder="Ingrese el nombre"
            id="product-name"
            addRef={firstInputRef}
            onChange={handleChange}
            value={name}
            name="name"
          />
        </FormGroup>

        <FormGroup
          label="Precio del Producto:"
          HtmlFor="product-price"
          info={`Este es el precio del producto en la moneda que maneja tu empresa, 
          este precio se mostrará cuando quieras agendar un pedido o algún cliente 
          te quiera comprar este producto`}
        >
          <Input
            type="number"
            placeholder="Ingrese el precio"
            id="product-price"
            onChange={handleChange}
            name="price"
            value={price}
          />
        </FormGroup>

        <FormGroup
          label="Imagen del Producto:"
          info={`Con esta imagen tanto tú como tus clientes podrán identificar de mejor manera el mismo. Si deseas agregar más de una imagen no te preocupes, ¡En la sección de los productos lo puedes hacer!`}
        >
          <Button buttonType="small" onClick={handleFileClick}>
            Insertar imagen
          </Button>
          <input
            onChange={handleFileChange}
            className="non-display"
            type="file"
            ref={inputFileRef}
          />
          <img ref={imageRef} />
        </FormGroup>

        <FormGroup
          label="Descripción del Producto"
          HtmlFor="product-desc"
          info={`Con esta descripción todos los clientes que quieran comprar este 
          producto podrán saber un poco más acerca de este`}
        >
          <TextArea
            placeholder="Ingrese la descripción"
            id="product-desc"
            name="desc"
            onChange={handleChange}
            value={desc}
          ></TextArea>
        </FormGroup>

        <Button buttonType="submit" onClick={handleSubmit}>
          Crear Producto
        </Button>
      </FormDiv>
    </AppLayout>
  );
};

export default CreateProduct;
