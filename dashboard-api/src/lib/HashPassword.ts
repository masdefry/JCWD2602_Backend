import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export const hashPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds)
}

export const hashMatch = async(passwordBody: string, passwordDb: string): Promise<boolean> => {
    return await bcrypt.compare(passwordBody, passwordDb)
}