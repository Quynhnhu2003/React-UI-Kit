// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import QRCodeStyling from 'qr-code-styling';
import React, { useEffect, useRef, useState } from 'react';

type typeCodeEnum =
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

const QRHasImage = () => {
  // ** State
  const [logo, setLogo] = useState<string>('');
  const [qrData, setQrData] = useState<string>('');
  const [urlPrefix, setUrlPrefix] = useState<string>('');
  const [colorCode, setColorCode] = useState<string>('');
  const [typeCode, setTypeCode] = useState<typeCodeEnum>('rounded');
  const [typeLogo, setTypeLogo] = useState<'show' | 'hidden'>('show');
  const [fileExt, setFileExt] = useState<'png' | 'jpeg' | 'webp'>('png');

  // ** Hook
  const qrCodeRef = useRef<any>(null);
  const qrCode = useRef(
    new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'canvas',
      data: '',
      image:
        'https://res.cloudinary.com/dwcg5odh2/image/upload/v1761378325/logo-faniverse_ckqotb.png',
      dotsOptions: {
        color: colorCode,
        type: 'rounded',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20,
      },
    })
  );

  // Append QR to DOM
  useEffect(() => {
    if (qrCodeRef.current) {
      qrCode.current.append(qrCodeRef.current);
    }
  }, []);

  // Update QR on data change
  useEffect(() => {
    if (qrData) {
      qrCode.current.update({
        data: qrData,
        image: typeLogo === 'hidden' ? '' : logo || '',
      });
    }
  }, [qrData, logo, typeLogo]);

  // Handle file input for logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlPrefix) {
      alert('Vui lòng nhập đầy đủ URL và mã hợp đồng');
      return;
    }
    const fullUrl = `${urlPrefix}`;
    setQrData(fullUrl);

    console.log(qrData);
  };

  const downloadQRCode = () => {
    qrCode.current.download({ extension: fileExt });
  };

  useEffect(() => {
    if (qrCode.current && typeCode) {
      qrCode.current.update({
        dotsOptions: {
          type: typeCode as
            | 'rounded'
            | 'dots'
            | 'classy'
            | 'classy-rounded'
            | 'square'
            | 'extra-rounded',
        },
      });
    }
  }, [typeCode]);

  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgContainer__formContainer}>
        <h2 className={styles.imgContainer__title}>Tạo mã QR có logo</h2>
        <form
          className={styles.formContainer}
          onSubmit={handleGenerateQR}
          style={{ marginBottom: '1rem' }}
        >
          <div className={styles['formContainer--input']}>
            <label>
              URL trước mã hợp đồng: <span>*</span>
            </label>
            <input
              id='urlInput'
              type='text'
              placeholder='https://example.com/'
              value={urlPrefix}
              onChange={(e) => setUrlPrefix(e.target.value)}
              required
            />
          </div>

          <div className={styles['formContainer--input']}>
            <label>
              Hiển thị logo:
              <select onChange={(e) => setTypeLogo(e.target.value as any)}>
                <option value='show' selected>
                  Hiển thị logo
                </option>
                <option value='hidden'>Ẩn logo</option>
              </select>
            </label>
          </div>
          <div className={styles['formContainer--input']}>
            <label>
              Ảnh logo trong QR:
              <input
                id='avatarInput'
                type='file'
                accept='image/*'
                onChange={handleLogoChange}
              />
            </label>
            {logo && <p className='text-muted overflow-hidden'>{logo}</p>}
          </div>
          <div className={styles['formContainer--input']}>
            <label>Màu QR:</label>
            <input
              id='colorInput'
              type='color'
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
            />
          </div>
          <div className={styles['formContainer--input']}>
            <label>Kiểu QR:</label>
            <select onChange={(e) => setTypeCode(e.target.value as any)}>
              <option value='rounded' selected>
                rounded
              </option>
              <option value='dots'>dots</option>
              <option value='classy'>classy</option>
              <option value='classy-rounded'>classy-rounded</option>
              <option value='square'>square</option>
              <option value='extra-rounded'>extra-rounded</option>
            </select>
          </div>
          <div className='formContainer__buttonContainer'>
            <div className='formContainer__buttonContainer--button'>
              <button
                id='submitBtn'
                type='submit'
                className='btn btn-outline-primary'
              >
                Tạo mã QR
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.imgContainer__resultQR}>
        {qrData && (
          <div className={styles.imgContainer__header}>
            <div>
              <label>Chọn định dạng tải xuống:</label>
              <select
                value={fileExt}
                onChange={(e) => setFileExt(e.target.value as any)}
              >
                <option value='png'>PNG</option>
                <option value='jpeg'>JPEG</option>
                <option value='webp'>WEBP</option>
              </select>
            </div>
            <button
              className='btn btn-outline-primary'
              style={{ whiteSpace: 'nowrap' }}
              onClick={downloadQRCode}
            >
              Tải QR Code
            </button>
          </div>
        )}
        <div className={styles.imgContainer__resultQR__item} ref={qrCodeRef} />
      </div>
    </div>
  );
};

export default QRHasImage;
