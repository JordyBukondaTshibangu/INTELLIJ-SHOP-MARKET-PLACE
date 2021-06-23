import bcrypt from 'bcryptjs'
 
const users = [
    {
        name : "Jordy Tshibss",
        email : "admin@test.com",
        password : bcrypt.hashSync('18971312', 8),
        isAdmin : true
    },
    {
        name : "John Doe",
        email : "johnDoe@test.com",
        password : bcrypt.hashSync('Doe', 8)
    },
    {
        name : "Walter White",
        email : "ww@test.com",
        password : bcrypt.hashSync('walter', 8)
    }
]

export default users 