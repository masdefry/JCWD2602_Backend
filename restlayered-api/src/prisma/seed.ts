import prisma from "./../connection/index";

const users = [
    {
        email: 'ryan@gmail.com', 
        name: 'Ryan Defryan', 
        password: 'abc12345'
    }
]

const createUsers = async() => {
    try {
        await prisma.users.createMany({
            data: users
        })
    } catch (error) {
        console.log(error)
    }
}

createUsers()