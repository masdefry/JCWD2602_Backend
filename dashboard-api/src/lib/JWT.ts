import jsonwebtoken from 'jsonwebtoken';

interface IJWTCreate {
    id: string, 
    role: string
}

export const jwtCreate = async({id, role}: IJWTCreate) => {
    return jsonwebtoken.sign({id, role}, 'abc123', {
        expiresIn: '1h'
    })
}

export const jwtVerify = async(token: string) => {
    return jsonwebtoken.verify(token, 'abc123')
}