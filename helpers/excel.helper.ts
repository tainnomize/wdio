//@ts-ignore : Ignore the warning Module '".../node_modules/xlsx/types/index"' has no default export
import reader from 'xlsx';
import * as moment from 'moment';

const dateFormatType = 'YYYY-MM-DD HH:mm:ss';
const TestData = './config/TestData.xlsx';

/**
 * Reads data from an Excel file and returns it as a JSON object.
 * @returns {Promise<Object>} The data from the Excel file.
 */
export async function readExcel() {
    const file = await reader.readFile(TestData);
    const data: any = {};

    // Loop through each sheet in the Excel file
    for (const sheetName of file.SheetNames) {
        // Convert sheet data to JSON and store in the data object
        const sheetData = await reader.utils.sheet_to_json(file.Sheets[sheetName]);
        data[sheetName] = sheetData;
    }

    return data;
}

/**
 * Writes data to a specific worksheet in the Excel file.
 * @param {any[]} writeData - The data to be written.
 * @param {string} wsName - The name of the worksheet to write to.
 */
export async function writeExcel(writeData: any[], wsName: string) {
    const file = await reader.readFile(TestData);
    const worksheet = await reader.utils.json_to_sheet(writeData);

    // Find the index of the worksheet
    const sheetIndex = file.SheetNames.findIndex(
        (name: any) => name.toLowerCase() === wsName.toLowerCase()
    );

    if (sheetIndex < 0) {
        // Append new sheet if it doesn't exist
        await reader.utils.book_append_sheet(file, worksheet, wsName);
    } else {
        // Update existing sheet
        file.Sheets[wsName] = worksheet;
    }

    // Save changes to the Excel file
    await reader.writeFile(file, TestData);
}

/**
 * Writes a specific data value into a cell in the Excel file.
 * @param {string} writeData - The data to write into the cell.
 * @param {string} row - The row identifier.
 * @param {string} column - The column name.
 * @param {string} wsName - The name of the worksheet.
 * @throws Will throw an error if the specified row is not found.
 */
export async function writeDataIntoCell(
    writeData: string,
    row: string,
    column: string,
    wsName: string
) {
    const file = reader.readFile(TestData);
    const sheetData: any[] = await reader.utils.sheet_to_json(file.Sheets[wsName]);

    // Find the row index based on the row identifier
    const rowIndex = sheetData.findIndex((item) => item.TC === row);
    if (rowIndex >= 0) {
        // Update the specified cell with the new data
        sheetData[rowIndex][column] = writeData;
        file.Sheets[wsName] = await reader.utils.json_to_sheet(sheetData);
        // Save changes to the Excel file
        await reader.writeFile(file, TestData);
    } else {
        throw new Error(`Row with TC=${row} not found in sheet ${wsName}`);
    }
}

/**
 * Writes test results to the Excel file.
 * @param {boolean} passed - Indicates if the test passed.
 * @param {number} start - The start time of the test.
 * @param {number} duration - The duration of the test.
 * @param {string} testCase - The test case identifier.
 * @param {string} wsName - The name of the worksheet.
 * @param {string} [message=''] - Additional message or note.
 */
export async function writeExcelResult(
    passed: boolean,
    start: number,
    duration: number,
    testCase: string,
    wsName: string,
    message: string = ''
) {
    // Format the start time and duration
    const formattedStartTime = moment(start).format(dateFormatType);
    const formattedDuration = new Date(duration).toISOString().slice(11, 19);
    const status = passed ? 'PASSED' : 'FAILED';

    // Write the results to the corresponding cells
    await writeDataIntoCell(formattedStartTime, testCase, 'Time', wsName);
    await writeDataIntoCell(formattedDuration, testCase, 'Duration', wsName);
    await writeDataIntoCell(status, testCase, 'Status', wsName);
    await writeDataIntoCell(message, testCase, 'Note', wsName);
}
