import "../../../../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'


interface IUser extends Document {
    email: string;
    password: string;
  }
//login
export async function POST(request: NextRequest) {
    try {
      // Parse the request body
      const body: IUser = await request.json();
      console.log(body);
      
      const {  email, password } = body;
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (!bcrypt.compareSync(password, findUser.password)) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }

      {
        const { _id, name , email , role  } = findUser;
        const tokenData = { _id, name , email , role }
      
      const secret : any = process.env.SECRETKEY;
     
      
      
      const token =  await jwt.sign(tokenData, secret , { expiresIn: '7d' });
     
      const cookieStore = cookies();
      cookies().set('session', token, {
        httpOnly: true,
        secure: secret ,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
      })
      
      return NextResponse.json(tokenData, { status: 200 });

      }

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }