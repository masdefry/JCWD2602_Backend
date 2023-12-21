// IMPORT DATABASE SETUP
import db from './../connection';
import util from 'util';
const query: any = util.promisify(db.query).bind(db);

interface IUserLogin{
    username: string, 
    password: string
}

export const queryLogin = async({username, password}: IUserLogin): Promise<any> => {
    const findAdmin: any = await query(`SELECT * FROM admins a
    JOIN shift_time st ON a.shift_time_id = st.id WHERE username = ? AND password = ?`, [username, password])

    return findAdmin 
}

export const queryCreateNewBook = async() => {

}

export const queryFindBranchAndCategory = async() => {

}