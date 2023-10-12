import mysql2 from 'mysql2';


const getData = async () => {
    const connection = await mysql2.createConnection({
        host: 'antibots-webb-prod.cewsx1jyfjsk.rds.cn-northwest-1.amazonaws.com.cn',
        user: 'admin',
        password: 'antibotswebb',
        database: 'antibot-webb',
        connectTimeout: 10000,
    });
    const query = 'SELECT * FROM \`antibots-webb\`';
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




