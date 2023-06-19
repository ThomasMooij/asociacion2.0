import mongoose from 'mongoose';
const { Schema } = mongoose;

const attendeesSchema = new Schema({

        name: 
        {
            type:String,
            required:true, 
        },
        phone: 
        {
            type:String,
            required:true, 
        },
        email: 
        {
            type:String,
            required:true, 
        },
        class:
        {
            type:[String],
            required:true, 
        },
        className: {
            type:[String],
            required:true, 
        },
        days:
        {
            type: [String],
            required:true, 
        },
});

export default mongoose.model( "Attendee", attendeesSchema)