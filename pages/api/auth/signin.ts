import bcrypt from "bcrypt"
import * as jose from 'jose'
import validator from 'validator';
import prisma from '@/utils/forPisma';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const { email, password } = req.body;
        const errors:string[] = [];

        const validationSchema = [
            {
                valid: validator.isEmail(email),
                errorMsg: "Invalid email."
            },
            {
                valid: validator.isLength(password, {min:1}),
                errorMsg: "Invalid password"
            }
        ];
        validationSchema.forEach(item => {
            if(!item.valid) errors.push(item.errorMsg);
        });
        if(errors.length) return res.status(400).json({errMsg: errors[0]});

        const userWithEmail = await prisma.user.findUnique({where: { email }});
        if(!userWithEmail) return res.status(401).json({errMsg: "Email or password is invalid"});

        const isMatching = await bcrypt.compare(password, userWithEmail.password);
        if(!isMatching) return res.status(401).json({errMsg: "Email or password is invalid"});

        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({email: userWithEmail.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret);

        setCookie("jwt", token, { req, res, maxAge: 60*60*24 });

        return res.status(200).json({
            firstName: userWithEmail.first_name,
            lastName: userWithEmail.last_name,
            email: userWithEmail.email,
            phone: userWithEmail.phone,
            city: userWithEmail.city,
            token
        })

    }
    else {
        return res.status(200).json({
            message: "POST request por favor"
        })
    }
};

export default signin;
