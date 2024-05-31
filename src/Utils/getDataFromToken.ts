import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("session")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.SECRETKEY!);
        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export const getFullData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("session")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.SECRETKEY!);
        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }

}


export const isAdmin = (request: NextRequest) => {
    try {
        const token = request.cookies.get("session")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.SECRETKEY!);
        if (decodedToken.role === "admin") {
            return true;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }   
}