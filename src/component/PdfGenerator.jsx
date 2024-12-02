// PDFGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { capitalize, transform, upperCase } from 'lodash';
import { formatDate, getCurrentDate } from "../pages/Common";




export const generatePDF = (data, columnNames, caption,columnWidthsPercentage,title='',filename='report') => {
  const pageWidth = 210; // A4 width in mm

  const doc = new jsPDF();
  console.log(data)
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  // Define columns and data
  const columns = columnNames.map(name => ({ header: name }));
  //const columnscaption = columnCaption.map(name => ({ header: name }));
print(columns)
  // Convert data objects to arrays of values
  const tableData = data.map(item => 
    columnNames.map(name => { const value= item[name] || '';
     return value.toString().toLowerCase()})
    );
  //const tableData = Array.isArray(data) && data.length > 0 ? data : defaultData;

  // Convert percentage-based column widths to absolute values
  const columnWidths = columnWidthsPercentage.map(percentage => {
    return (pageWidth - 20) * (percentage / 100); // Page width minus margins
  });
console.log(columns)
  // Create column styles dynamically based on absolute widths
  const columnStyles = columns.reduce((styles, _, index) => {
    styles[index] = { cellWidth: columnWidths[index] };
    return styles;
  }, {});

  // Add table
  doc.autoTable({
    head: [caption],
    body: tableData,
    startY: 30, // Start Y position
    margin: { horizontal: 15 }, // Margins (left and right)
    theme: 'grid',// Options: 'striped', 'grid', 'plain', 'css'
    columnStyles: columnStyles,
    styles: {
      overflow: 'linebreak', // Handle long text
      fontSize: 8 },// Set font size for the entire table
    headStyles: {
        fillColor: [52, 152, 219], // Blue background
        textColor: [255, 255, 255], // White text color
        fontSize: 10, // Larger font size for headers
        fontStyle: 'bold' // Bold text
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Light grey background
      textColor: [0, 0, 0], // Black text color
      

    },
  
    // Alternate row styles
    alternateRowStyles: {
      fillColor: [230, 230, 230], // Slightly darker grey for alternate rows
    },
  
    // Footer row styles (if applicable)
    footStyles: {
      fillColor: [52, 152, 219], // Same blue as header
      textColor: [255, 255, 255], // White text color
      fontSize: 10, // Smaller font size
      fontStyle: 'italic' // Italic text
    },

    
  });


    const currentDate =formatDate( getCurrentDate());
    const footerLink = 'Shree Kuberji Builders';

    // Adding footer to each page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        
        doc.textWithLink(footerLink, 170, doc.internal.pageSize.height - 6, { url: 'https://erp.kuberji.com' }); // Footer link on the right
        doc.text(`Date:${currentDate}`, 20, doc.internal.pageSize.height - 6, { align: 'center' }); // Date in the center
    }

  // Save the PDF
  doc.save(filename+'.pdf'); // Triggers the download
};
