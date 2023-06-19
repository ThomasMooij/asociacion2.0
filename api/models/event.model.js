import mongoose from 'mongoose';
const { Schema } = mongoose;

const eventSchema = new Schema({

    name:
        {
            type: String,
            required: true,
        },
    day: 
        {
            type:String,
            required:true,
        },
    month:
        {
            type: Number,
            required:true,
            enum: [1,2,3,4,5,6,7,8,9,10,11,12],
        },
     year:
        {
            type: Number,
            required:true,
            enum: [2023,2024,2025,2026,2027,2028]
        },
    description:
        {
            type: String,
            required:true,
        },
    location:
        {
            type:String,
            required: true,
        },
    mainImage:
        {
            type:String,
        },
    collectionId: 
        {
            type: [String],
        }
    
});

export default mongoose.model( "Event", eventSchema)