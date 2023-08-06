import fs from 'fs'
import path from 'path'
import { compare, hash } from 'bcryptjs'

const filePath = path.join(process.cwd(), 'src', 'userData', 'users.json')

export function getAll() {
    const user = fs.readFileSync(filePath)
    return (JSON.parse(user));
}

export function getById(id) {

    const singleUser = getAll()
    return singleUser.find(item => item.id === id)
}

export function getByEmail(email) {
    const singleUser = getAll()
    return singleUser.find(item => item.email.toLowerCase() === email.toLowerCase())
}

export async function verifyPassword(hashedPassword, password) {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

export async function save(email, password) {
    // emailFound ma hum na eik get getByEmail(email) ka function call kra ha with parameter email, jo hamary data ma find kry ga agr email exist kr ta ha ya nhi, agr email pehly sa exists kr ta ha tw wo emailFound ma store ho jaye ga otherwise emailFound undefine dy ga. 
    const emailFound = getByEmail(email)
    if (emailFound) {
        throw new Error("User Already exists!!")
        // throw new Error iss liye use kra ha agr try-catch block ma save ka jaha bhi function call ho ga aur agr waha koi error aye ga tw waha wo catch k block ma chala jaye ga.
    }
    const allUsers = getAll()
    const hashedPassword = await hash(password, 12) // salt = 8-12 are prefer by professionals.
    allUsers.push(
        {
            id: allUsers.length + 1,
            email,
            password: hashedPassword
        }
    )
    // New User saving to JSON File
    fs.writeFileSync(filePath, JSON.stringify(allUsers))
}

