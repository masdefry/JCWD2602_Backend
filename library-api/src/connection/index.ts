import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'abc12345', 
    database: 'jcwd2602_library'
})

db.connect((error: any) => {
    if(error) return console.log(error)

    console.log('Connected to Database')
})

export default db;