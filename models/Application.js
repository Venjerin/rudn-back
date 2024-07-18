import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    surname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, {
    timestamps: true
});


export const ApplicationModule = mongoose.model('Application', ApplicationSchema)