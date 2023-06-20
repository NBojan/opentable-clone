import bcrypt from "bcrypt"
import * as jose from 'jose'
import validator from 'validator';
import prisma from '@/utils/forPisma';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const { firstName, lastName, email, phone, city, password } = req.body;
        
        const errors:string[] = [];
        const validationSchema = [
            {
                valid: validator.isLength(firstName, {min: 1, max: 20}),
                errorMsg: "Invalid first name."
            },
            {
                valid: validator.isLength(lastName, {min: 1, max: 30}),
                errorMsg: "Invalid last name."
            },
            {
                valid: validator.isEmail(email),
                errorMsg: "Invalid email."
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMsg: "Invalid phone number."
            },
            {
                valid: validator.isLength(city, {min: 1}),
                errorMsg: "Invalid city."
            },
            {
                valid: validator.isStrongPassword(password),
                errorMsg: "Password is not strong enough. Use uppercase, lowercase, numbers and special sign."
            }
        ];
        validationSchema.forEach(item => {
            if(!item.valid) errors.push(item.errorMsg);
        })
        if(errors.length) return res.status(400).json({errMsg: errors[0]});

        const existingUserEmail = await prisma.user.findUnique({where: { email }})
        if(existingUserEmail) return res.status(400).json({errMsg: "Email is already in use"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                city,
                email,
                phone,
                password: hashedPassword
            }
        })

        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({email: newUser.email}).setProtectedHeader({alg}).setExpirationTime("24hr").sign(secret);

        setCookie("jwt", token, { req, res, maxAge: 60*60*24 });

        return res.status(200).json({
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            city: newUser.city,
            email: newUser.email,
            phone: newUser.phone,
            token
        })    
    }
    else {
        return res.status(200).json({
            message: "POST request por favor"
        })
    }
};

export default signup;
