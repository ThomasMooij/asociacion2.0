import mongoose from 'mongoose';

const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    fileNames: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Photo', photoSchema);
