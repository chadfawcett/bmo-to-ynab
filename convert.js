const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

const results = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const transformedData = results.map(row => {
      return {
        Date: formatDate(row['Posting Date']),
        Payee: row['Description'],
        Amount: switchSign(row['Transaction Amount'])
      };
    });

    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: [
        {id: 'Date', title: 'Date'},
        {id: 'Payee', title: 'Payee'},
        {id: 'Amount', title: 'Amount'}
      ]
    });

    csvWriter.writeRecords(transformedData)
      .then(() => {
        console.log('CSV file successfully processed and written to', outputFilePath);
      });
  });

function formatDate(date) {
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`;
}

function switchSign(amount) {
  return (-parseFloat(amount)).toFixed(2);
}
