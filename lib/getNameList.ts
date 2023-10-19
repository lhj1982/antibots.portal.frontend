import mysql2 from 'mysql2';


const getData = async () => {
    const connection = await mysql2.createConnection({
        host: 'xxx',
        user: 'xxx',
        password: 'xxxx',
        database: 'xxxx',
        connectTimeout: 10000,
    });
    const query = 'SELECT * FROM \`xxxxx\`';
    connection.connect();
    return new Promise((success,error)=>{
        connection.query(query, (err, results) => {
            if (err) {
                console.error(err);
                error(err);
            } else {
                console.log((results))
                success(results);

            }

        });
    })
}

export default getData;




