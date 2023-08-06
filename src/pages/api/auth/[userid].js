import { getById } from "../../../services/user"

export default function userId(req, res) {
    if (req.method === 'GET') {
        const { userid } = req.query
        // console.log(userid);
        const user = getById(Number(userid))
        return res.status(200).json(user)
    }

} 