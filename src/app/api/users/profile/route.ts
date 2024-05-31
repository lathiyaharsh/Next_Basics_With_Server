import "../../../../../lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";
import { getDataFromToken } from "@/Utils/getDataFromToken";
import { IUser } from "../route";


export async function GET(request:NextRequest){

  try {
      const userId = await getDataFromToken(request);
    
      const user = await User.findOne({_id: userId}).select("-password");
      return NextResponse.json({
          mesaaage: "User found",
          user
      })
      
  } catch (error:any) {
      return NextResponse.json({error: error.message}, {status: 400});
  }

}

export async function PATCH(request: NextRequest) {
    try {
      const body: IUser = await request.json();

      const userId = await getDataFromToken(request);
      const { name , description , city ,gender , hobby } = body;
      const user = await User.findOneAndUpdate({_id: userId}, {name, description, city, gender, hobby}, {new: true});
  
      return NextResponse.json({
        mesaaage: "User Updated",
        user
    })
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }