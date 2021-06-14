import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import isNumber from 'validator/lib/isNumeric';
import { v4 } from 'uuid';

import AppLayout from '@templates/app-layout/AppLayout';

import { showErr } from '@functions/alerts.functions';

import FormGroup from '@atoms/form-group/FormGroup';
import TextArea from '@atoms/text-area/TextArea';
import Button from '@atoms/button/Button';
import Input from '@atoms/input/Input';

import { acceptedFormats } from '@utils/variables';

import FormDiv from '@molecules/form-div/FormDiv';
import { handlerRequestErr, isEmpty } from '@functions/validate.functions';
import firebaseInstance from '@config/firebase.instance';

const CreateProduct = () => {
  const firstInputRef = useRef(null as null | HTMLInputElement);
  const inputFileRef = useRef(null as null | HTMLInputElement);
  const imageRef = useRef(null as null | HTMLImageElement);

  const [data, setData] = useState({
    name: '',
    price: '',
    desc: '',
  });
  const [file, setFile] = useState(null as null | File);

  const { name, desc, price } = data;

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus({ preventScroll: true });
  }, [firstInputRef]);

  const handleFileClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.currentTarget.files![0];

    if (acceptedFormats.indexOf(file.type) === -1) {
      setFile(null);
      imageRef.current!.src = '';
      showErr('Por favor, ingresa un archivo con formato permitido');
      return;
    }

    if (file.size > 5000000) {
      setFile(null);
      imageRef.current!.src = '';
      showErr('Por favor, ingresa un archivo menor a 5MB');
      return;
    }

    const blob = new Blob([file]);
    const URL = window.URL || window.webkitURL;
    imageRef.current!.style.width = '100%';
    imageRef.current!.style.marginTop = '20px';
    imageRef.current!.src = URL.createObjectURL(blob);
    setFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    if (isEmpty(name, price)) {
      showErr('Por favor, el nombre y el precio son campos requeridos');
      return;
    }

    if (!isNumber(price)) {
      showErr('Por favor, ingrese un precio válido');
      return;
    }

    if (parseFloat(price) <= 0) {
      showErr('Por favor ingrese un precio válido');
      return;
    }

    try {
      let imgName: null | string = null;
      if (file) {
        const uploadTask = await firebaseInstance.ref
          .child(`products-images/${v4}`)
          .put(file, {
            contentType: file.type,
          });
        imgName = uploadTask.metadata.fullPath;
      }

      
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
