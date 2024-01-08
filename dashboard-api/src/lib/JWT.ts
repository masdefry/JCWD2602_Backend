import jsonwebtoken from 'jsonwebtoken';

interface IJWTCreate {
    id: string, 
    email: string, 
    username: string
}

export const jwtCreate = async({id, email, username}: IJWTCreate) => {
    return jsonwebtoken.sign({id, email, username}, 'abc123', {
        expiresIn: '1h'
    })
}