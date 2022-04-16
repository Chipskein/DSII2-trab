const { Client } = require('pg');
const dbClientConfig={
    connectionString: 'postgres://pvknggygtnstvp:52603e6e0f87b47ded798f3bc2c414b7bbad5f8b95c555ed8784f315ed45d646@ec2-18-215-96-22.compute-1.amazonaws.com:5432/d31l3obp4bice2',
    ssl: {rejectUnauthorized: false}
}
const dbcon = new Client(dbClientConfig);
dbcon.connect(err => {
    if (!err) console.log('Connected with database');
    else {
        console.log("ERROR Connect with database failed",err);
    }
});
module.exports = {
    dbcon
}