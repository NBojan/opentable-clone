import * as jose from 'jose'
import jwt from "jsonwebtoken";
import prisma from '@/utils/forPisma';
import { NextApiRequest, NextApiResponse } from "next";

const me = async (req: NextApiRequest, res: NextApiResponse) => {
        const bearerToken = req.headers.authorization;
        if(!bearerToken) return res.status(401).json({errMsg: "Not Authorized"});

        const token = bearerToken.split(" ")[1];
        if(!token) return res.status(401).json({errMsg: "Not Authorized"});

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const verifyToken = await jose.jwtVerify(token, secret).catch(error => error);
        if(!verifyToken.payload) return res.status(401).json({errMsg: verifyToken.message});

        const payload = jwt.decode(token) as { email:string };
        if(!payload.email) return res.status(401).json({errMsg: "Not Authorized"});

        const user = await prisma.user.findUnique({
          where: {
            email: payload.email,
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
          },
        });
        if(!user) return res.status(401).json({errMsg: "User does not exist."});

        return res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city,
        });
};

export default me;