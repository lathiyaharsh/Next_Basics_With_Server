import mongoose, { Schema, Model, Document, Mongoose } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  description: string;
  city: string;
  gender: string;
  hobby: string[];
  isActive: boolean;
  role: string;
}

const userSchema = new mongoose.Schema<User>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
       type : String,
       required : true 
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : [String],
        required: true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    role:{
        type : String,
        required : true
    }
});

const UserModel: Model<User> = mongoose.models.User as Model<User> || mongoose.model<User>('User', userSchema);

export default UserModel;