import "../../../../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from 'bcrypt';
import { getFullData, isAdmin } from "@/Utils/getDataFromToken";

//get all users
export async function GET(request: NextRequest , response: NextResponse) { 
  try {
    const admin = isAdmin(request);
    if(!admin){
      return NextResponse.json({error: "Unauthorized"}, { status: 401 });
    }
    
    const data : any = await User.find();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  description: string;
  city: string;
  gender: string;
  hobby: string[];
  isActive: boolean;
}

//create user
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: IUser = await request.json();

    const { name, email, password, description, city, gender, hobby } = body;
    const newUser = new User({
      name,
      email,
      password : await bcrypt.hash(password, 10),
      description,
      city,
      gender,
      hobby,
      isActive: true,
      role: "user",
    });

    await User.create(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}