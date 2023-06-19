import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({

    name: 
    {
        type:String,
        required:true,
    },
    email: 
    {
        type: String,
        required: true,
    },
    presidente: 
    {
        type: Boolean,
        default: false
    },
    password: 
    {
        type: String,
        required:true,
    }
});

export default mongoose.model( "User", userSchema)