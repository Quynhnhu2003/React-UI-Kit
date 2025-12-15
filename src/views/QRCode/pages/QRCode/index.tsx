// ** Styles Import
import styles from './index.module.scss';

// ** React Import
import * as XLSX from 'xlsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ListQR from './components/ListQR';
import { FormQR } from '../../utils/types/qrCodeType';

function QRCode() {
  // ** State
  const [dataQR, setDataQR] = useState<FormQR>();
  const [listImport, setListImport] = useState<any>();
  const [typeSelect, setTypeSelect] = useState<string>('');

  // ** Hooks
  const { register, handleSubmit, reset } = useForm();

  // ** Function: Get data from react hook form
  const onSubmit = (data: any) => {
    if (data) {
      // ** Feature: slipt (,) or (', ') in code contract and check where code contract get data
      const formatedCode = {
        ...dataQR,
        codeContract:
          data.codeContract &&
          typeof data.codeContract === 'string' &&
          data.codeContract !== ''
            ? data.codeContract.split(', ').length > 1
              ? data.codeContract.split(', ')
              : data.codeContract.split(',')
            : listImport && listImport.codeContract.length > 0
            ? listImport.codeContract
            : [],
        url: data.url,
        paperSize: data.paperSize,
        qrSize: data.qrSize,
        qrType: data.qrType,
      };
      setDataQR(formatedCode);
      reset();
    } else {
      console.log('Error');
    }
  };

  // ** Function: Get data from file excel
  const importContract = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return; // If no file selected, exit

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // First sheet
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // Treat first row as data, not headers
      defval: '', // Provide default value for empty cells
      blankrows: false,
    });

    const readData = jsonData.map((row: any) => row[0] || '');
    readData.shift();

    const codeContract = {
      ...dataQR,
      codeContract: readData,
      // url:
    };

    // Update state with both codeContracts and FormQR data
    setListImport(codeContract);
  };

  return (
    <div className={styles.createQRContainer}>
      <div className={styles.createQRContainer__formContainer}>
        <p className={styles.createQRContainer__title}>Biểu mẫu Tạo mã QR</p>

        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/***** Select: type of get contract code *****/}
          <div className={styles['formContainer--input']}>
            <label>Chọn kiểu nhập mã hợp đồng</label>
            <select onChange={(e) => setTypeSelect(e.target.value)}>
              <option value='manual'>Nhập thủ công</option>
              <option value='file' selected>
                Nhập theo file hợp đồng
              </option>
            </select>
          </div>
          {/***** Input: import data using manual or file *****/}
          <div className={styles['formContainer--input']}>
            {typeSelect === 'manual' ? (
              <div className={styles['formContainer--input']}>
                <label>Nhập mã hợp đồng</label>
                <input
                  type='text'
                  placeholder='Examples: 123456, abc4852'
                  required
                  {...register('codeContract')}
                />
              </div>
            ) : (
              <div className={styles['formContainer--input']}>
                <div>
                  <label className='me-3'>File hợp đồng</label>
                  <a href='./assets/file/contract.xlsx' download>
                    File mẫu
                  </a>
                </div>
                <input type='file' accept='.xlsx' onChange={importContract} />
              </div>
            )}
          </div>
          {/***** Input: import URL *****/}
          <div className={styles['formContainer--input']}>
            <label>Url trước mã hợp đồng</label>
            <input
              type='text'
              id='url'
              placeholder='https://google.com/.....'
              {...register('url', { required: true, maxLength: 100 })}
            />
          </div>
          {/***** Input: import paper size *****/}
          <div className={styles['formContainer--input']}>
            <label>Chọn kích thước khổ giấy</label>
            <select {...register('paperSize')}>
              <option value='0' selected>
                A4
              </option>
              <option value='1'>A5</option>
            </select>
          </div>
          {/***** Input: import qr size *****/}
          <div className={styles['formContainer--input']}>
            <label>Chọn kích thước QR</label>
            <select {...register('qrSize')}>
              <option value='0' selected>
                3cmx3cm
              </option>
              <option value='1'>4cmx4cm</option>
            </select>
          </div>
          {/***** Input: import qr type *****/}
          <div className={styles['formContainer--input']}>
            <label>QR có khung/không khung</label>
            <select {...register('qrType')}>
              <option value='0' selected>
                Không có khung
              </option>
              <option value='1'>Có khung</option>
            </select>
          </div>
          {/***** Button: button action (create and print) *****/}
          <div className={styles.formContainer__buttonContainer}>
            <div className={styles['formContainer__buttonContainer--button']}>
              <button type='submit'>Tạo mã QR</button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.createQRContainer__resultQR}>
        {dataQR && dataQR.codeContract && <ListQR dataQR={dataQR} />}
      </div>
    </div>
  );
}
export default QRCode;
