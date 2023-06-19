import mongoose from "mongoose";
const { Schema } = mongoose;

const classSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  days: 
     [
      {
        label: Number, 
        day: String,
        initialAvailibility: Number,
        availibility: Number,
      },
    ],
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  attendees: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  collectionName: {
    type: [],
  },

});

export default mongoose.model("Classes", classSchema);
