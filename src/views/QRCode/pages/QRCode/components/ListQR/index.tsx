// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import { jsPDF } from 'jspdf';
import { useState } from 'react';
import domtoimage from 'dom-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import CountDown from '../../../QRCode/components/CountDown';

export default function ListQR({ dataQR }: any) {
  // ** State
  const [countDown, setCountDown] = useState<number>(0);
  const [_, setPages] = useState<number>(1);

  // ** Function
  const chunkArray = (arr: any[], size: number) => {
    // Feature: slice array to get 4 div in column
    return arr.reduce((acc: any[], _: any, i: number) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const groupDiv = chunkArray(
    dataQR.codeContract,
    dataQR.paperSize == 0 ? 4 : dataQR.qrSize == 1 ? 2 : 3
  );
  const groupPages = [];

  // Feature: merge 4 groupDiv to groupPage is a page
  // Check user choose 'a4'
  if (dataQR.paperSize == 0) {
    // Check user choose qr size is '3cm x 3cm'
    if (dataQR.qrSize == 0) {
      for (let i = 0; i < groupDiv.length; i += 5) {
        groupPages.push(groupDiv.slice(i, i + 5));
      }
    } else {
      // or '4cm x 4cm'
      for (let i = 0; i < groupDiv.length; i += 4) {
        groupPages.push(groupDiv.slice(i, i + 4));
      }
    }
  } else {
    // or 'a5'
    if (dataQR.qrSize == 0) {
      for (let i = 0; i < groupDiv.length; i += 4) {
        groupPages.push(groupDiv.slice(i, i + 4));
      }
    } else {
      for (let i = 0; i < groupDiv.length; i += 3) {
        groupPages.push(groupDiv.slice(i, i + 3));
      }
    }
  }

  const funcDown = () => {
    // Feature: Reset countdown when done
    setCountDown(0);
  };

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: dataQR.paperSize == 0 ? 'a4' : 'a5',
      putOnlyUsedFonts: true,
    });

    const totalPages = groupPages.length;
    let currentPage = 0;

    // Start the countdown based on number of pages to generate
    setCountDown(totalPages);

    // Loop through the pages
    for (let index = 0; index < groupPages.length; index++) {
      const qrCodeElement = document.getElementById(`qr-code-${index + 1}`);

      if (!qrCodeElement) return;
      const res = await domtoimage.toPng(qrCodeElement);

      for (let pageIndex = 0; pageIndex < 2; pageIndex++) {
        if (qrCodeElement) {
          try {
            if (dataQR.paperSize == 0) {
              doc.addImage(res, 'PNG', 0, 0, 430, 502);
            } else {
              doc.addImage(res, 'PNG', 0, 0, 315, 387);
            }
          } catch (error) {
            console.error('Error generating QR code image:', error);
          }
        }
      }

      // check if index + 1 is smaller than group page, add new page
      if (index + 1 < groupPages.length) {
        doc.addPage();
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second per page

      setCountDown((prev) => prev - 1); // Decrease countdown by 1 second for each page
      setPages(currentPage++);
    }

    funcDown();

    // Save PDF
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <div className={styles.listQRContainer}>
      <div className={styles.listQRContainer__header}>
        <p className={styles.listQRContainer__header__title}>
          Danh sách mã QR được tạo
        </p>
        <div className={styles.listQRContainer__header__printQR}>
          <button onClick={() => generatePDF()}>Print QR to PDF</button>
        </div>
      </div>
      {groupPages &&
        groupPages.length > 0 &&
        groupPages.map((group: any, indexPage: number) => (
          <div
            key={indexPage}
            id={`qr-code-${indexPage + 1}`}
            className={
              styles.listQRContainer__list +
              (dataQR.paperSize == 0
                ? styles['listQRContainer__list--a4']
                : styles['listQRContainer__list--a5'])
            }
            style={
              dataQR.paperSize == 0
                ? { height: '945px', width: '756px' }
                : { height: '473px', width: '378px' }
            }
          >
            {group &&
              group.map((row: any, indexRow: number) => (
                <div
                  key={indexRow}
                  className={
                    dataQR.qrType == 1
                      ? styles.listQRContainer__list__page
                      : styles.listQRContainer__list__page +
                        ' ' +
                        (dataQR.paperSize == 0
                          ? styles['listQRContainer__list__page--a4']
                          : styles['listQRContainer__list__page--a5'])
                  }
                  style={
                    dataQR.qrSize == 1 && dataQR.qrType == 0
                      ? { marginBottom: '30px' }
                      : { marginBottom: 0 }
                  }
                  id={`qr-code-page-${indexRow}`}
                >
                  {row &&
                    row.map((code: string, index: number) => (
                      <div
                        key={index}
                        className={
                          styles.listQRContainer__list__row +
                          (dataQR.qrType == 0
                            ? ''
                            : styles['listQRContainer__list__row--border'])
                        }
                      >
                        <div
                          className={styles.listQRContainer__list__item}
                          style={
                            // a4
                            dataQR.paperSize == 0
                              ? dataQR.qrSize == 0
                                ? // 3cm x 3xm
                                  dataQR.qrType == 0
                                  ? { width: '160px', height: '160px' }
                                  : { width: '150px', height: '150px' }
                                : // 4cm x 4cm
                                dataQR.qrType == 0
                                ? { width: '160px', height: '160px' }
                                : { width: '170px', height: '170px' }
                              : //a5
                              dataQR.qrSize == 0
                              ? // 3cm x 3xm
                                dataQR.qrType == 0
                                ? { width: '110px', height: '110px' }
                                : { width: '100px', height: '100px' }
                              : // 4cm x 4cm
                              dataQR.qrType == 0
                              ? { width: '120px', height: '120px' }
                              : { width: '140px', height: '140px' }
                          }
                        >
                          {/* a4 */}
                          {dataQR.paperSize == 0 ? (
                            // 3cm x 3cm
                            dataQR.qrSize == 0 ? (
                              <QRCodeCanvas
                                value={dataQR.url + code}
                                size={120}
                              />
                            ) : (
                              // 4cm x 4cm
                              <QRCodeCanvas
                                value={dataQR.url + code}
                                size={160}
                              />
                            )
                          ) : // a5 (3cm x 3cm)
                          dataQR.qrSize == 0 ? (
                            <QRCodeCanvas value={dataQR.url + code} size={85} />
                          ) : (
                            // 4cm x 4cm
                            <QRCodeCanvas
                              value={dataQR.url + code}
                              size={110}
                            />
                          )}
                          <p
                            className={styles.listQRContainer__list__item__text}
                          >
                            {code}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      {/* Loading countdown */}
      <CountDown countDown={countDown} />
    </div>
  );
}
