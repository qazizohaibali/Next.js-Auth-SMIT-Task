// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAll, save } from "../../../services/user"

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).send()

  } const { email, password } = req.body
  try {
    save(email, password)
    // console.log(name, email, password);
    return res.status(201).send('user Created')

  } catch (error) {
    return res.status(400).json({ message: error })
  }
}


