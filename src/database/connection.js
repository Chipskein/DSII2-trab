const { Client } = require('pg');
const DATABASE_URL=process.env.DATABASE_URL;
const dbClientConfig={
    connectionString: DATABASE_URL,
    ssl: {rejectUnauthorized: false}
}
const dbcon = new Client(dbClientConfig);
dbcon.connect(err => {
    if (!err) console.log('Connected with database');
    else {
        console.log("ERROR Connect with database failed",err);
    }
});
module.exports={dbcon};