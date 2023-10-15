import { Service } from "typedi"
const extract = require('extract-zip');

@Service()
export class BulkImportService {
public async extractZip(zipPath, extractPath): Promise<any> {
  return new Promise((resolve, reject) => {
    extract(zipPath, { dir: extractPath }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data)
      }
    });
  });
}

// XLSX to Json
public async xlsxToJson(inputFile: any, sheetName: string): Promise<any> {
  const xlsxToJson = require('xlsx-to-json');
  return new Promise((resolve, reject) => {
    xlsxToJson({
      input: inputFile,
      output: null,
      sheet: sheetName,
    }, (err, result) =>{
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
}

// doc-sign
public async docSign(tokenUrl: string, options: any): Promise<any> {
  const https = require('https');  
  return new Promise((resolve, reject) => {
    https.request(tokenUrl, options, (res) => {
      console.log(res, 'responseeeeeeeeeeeeee');
      
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          resolve(response.access_token);
        } else {
          reject(`Error getting access token. Status code: ${res.statusCode}`);
        }
      });
    });
  });
}
}
