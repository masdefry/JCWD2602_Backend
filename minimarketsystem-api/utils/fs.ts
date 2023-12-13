import fs from 'fs'; // FS: File System ---> Untuk Reading File
export const read = (): any => {
    return JSON.parse(fs.readFileSync('./database/db.json', 'utf-8')) // Array of Object
}

export const write = (findAllUsers: {}): any => {
    fs.writeFileSync('./database/db.json', JSON.stringify(findAllUsers))
}

