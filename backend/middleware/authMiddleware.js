import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect =  async (req, res, next) => {
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('token found', req.headers.authorization);
    }

}
 
export { protect }