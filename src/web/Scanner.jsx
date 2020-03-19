import React, { useEffect, useRef } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

function Scanner({ onScanned, onError }) {
  const video = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader();
    (async () => {
      try {
        const result = await codeReader.decodeOnceFromVideoDevice(undefined, video.current);
        if (onScanned) {
          onScanned({ target: { value: result.text } });
        }
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    })();
    return () => codeReader.reset();
  }, []);

  return (
    <>
      Scanning
      <video
        width="100%"
        height="50%"
        ref={video}
      />
    </>
  );
}

export default Scanner;
