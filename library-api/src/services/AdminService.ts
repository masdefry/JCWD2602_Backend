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

export const queryCreateNewBook = async({title, publisher, publish_year}: any): Promise<number> => {
    const {insertId} = await query(`INSERT INTO books SET ?`, {
        title, publisher, publish_year
    })

    return insertId
}

export const queryCreateBookHasBranch = async({branch_id}: any): Promise<void> => {
    await query(`INSERT INTO books_has_branch(books_id, branch_id, stocks, total_borrowed) VALUES ?`, [branch_id])
}

export const queryCreateBookHasCategory = async({category_id}: any): Promise<void> => {
    await query(`INSERT INTO category_has_books(category_id, books_id) VALUES ?`, [category_id])
}

export const queryFindBranchAndCategory = async(): Promise<any> => {
    const findCategories: any = await query('SELECT * FROM categories')
    const findBranch: any = await query('SELECT id, name FROM branches')

    return {findCategories, findBranch}
}