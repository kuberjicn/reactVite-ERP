import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry'; // Make sure the worker is included

const PDFThumbnail = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Load the PDF
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1); // Get the first page

      const scale = 0.2; // Adjust this for the thumbnail size
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Render the page
      page.render(renderContext);
    };

    renderPDF();
  }, [pdfUrl]);

  return <canvas ref={canvasRef} style={{ border: '1px solid #ddd', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', margin: '10px' }} />;
};

export default PDFThumbnail;
