import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../prisma/migrations/20221020100724_init/migration.sql'
import { PrismaClient } from '@prisma/client'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const prisma = new PrismaClient();
    const { firstName, surName, email, message } = req.body;

    if(req.method === 'POST'){
        return prisma.User.create({firstName, surName, email, message })
                   .then((createdUser: { firstName: any; surName: any; email: any; message: any; }) => {
                    console.log('createdUser: ', createdUser)
                    const {id, firstName, surName, email, message} = createdUser;
                    const user = {id, firstName, surName, email, message};
                    res.status(200).json({user: user}) 
                    return
                   })
                   .catch((err: any) => {
                    console.log(err);
                    res.status(500).json({message: 'Internal server error'})}) 
    }
    else {
        res.status(405).json({message: 'Only POST requests are allowed.'})
        return
    }
  
}