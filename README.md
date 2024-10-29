# bmo-to-ynab
Convert BMO exported CSV statements to YNAB formatted upload CSV

## Usage

To use the `convert.js` script, follow these steps:

1. Install the required dependencies:
   ```sh
   npm install
   ```

2. Place your BMO exported CSV file in the same directory as `convert.js`.

3. Run the script with the input CSV file and specify the output CSV file:
   ```sh
   node convert.js input.csv output.csv
   ```

The script will read the input CSV file, process the data, and write the output CSV file in YNAB compatible format.

## Example

Input CSV (`input.csv`):
```
Posting Date,Description,Transaction Amount
20220101,Payment,-100.00
20220102,Deposit,200.00
```

Output CSV (`output.csv`):
```
Date,Payee,Amount
2022-01-01,Payment,100.00
2022-01-02,Deposit,-200.00
```
