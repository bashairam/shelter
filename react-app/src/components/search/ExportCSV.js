import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button} from 'react-bootstrap';

export const ExportCSV = ({csvData, fileName}) => {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8 ;direction = right';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
      <Button  className="me-0 my-2" style={{display: 'block' }} onClick={(e) => exportToCSV(csvData,fileName)}> 
      שתף תוצאות </Button>
  )
}
