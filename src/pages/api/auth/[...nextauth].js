import { getByEmail, verifyPassword } from '@/services/user';
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize({ email, password }) {
                const user = getByEmail(email)
                if (!user) {
                    throw new Error('User Not Found!!!')
                }
                //   verify password is a function responsible for comparing hashed password store in DB which we are getting user.password,  and the password is given at the time of login.

                const isValid = await verifyPassword(user.password, password)
                if (!isValid) {
                    throw new Error('Incorrect Password!!!')
                }
                return { email }
            }
        })
    ]
}
export default NextAuth(authOptions)