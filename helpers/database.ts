import { createConnection, Connection } from 'promise-mysql';
import { readExcel } from './excel.helper';

/**
 * Retrieves database connection information from an Excel file.
 * @returns {Promise<Connection>} - A promise that resolves to a MySQL connection.
 */
async function getConnection(): Promise<Connection> {
    try {
        const connectionInfo = await readExcel();
        const dbUrl = connectionInfo['ConnectionInfo'][0]?.DB_URL;

        if (!dbUrl) {
            throw new Error('Database URL not found in connection info');
        }

        return createConnection(dbUrl);
    } catch (error) {
        console.error('Error getting connection:', error);
        throw error;
    }
}

/**
 * Executes a SQL query on the database.
 * @param {string} queryString - The SQL query string to be executed.
 * @returns {Promise<any>} - A promise that resolves to the query result.
 */
export async function query(queryString: string): Promise<any> {
    let conn: Connection | null = null;

    try {
        conn = await getConnection();
        const result = await conn.query(queryString);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        if (conn) {
            try {
                await conn.end();
            } catch (closeError) {
                console.error('Error closing the connection:', closeError);
            }
        }
    }
}