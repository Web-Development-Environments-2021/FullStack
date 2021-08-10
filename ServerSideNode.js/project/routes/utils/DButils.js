require("dotenv").config();
const sql = require("mssql");

//-------------config file definitions-----------------//
const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

//-------------connecting to sql data base from Azure server-----------------//

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();
exports.execQuery = async function (query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};
