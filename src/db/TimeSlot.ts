import { Schema, Document, Model, model } from "mongoose";

export const TimeSlotSchema = new Schema<TimeSlotDocument, Model<TimeSlotDocument>>({
  user: String,
  username: String,
  day: Number,
  slot: Number
}, {
  collection: 'timeslot'
});

export interface TimeSlotDocument extends Document {
  user: String,
  username: String,
  day: Number,
  slot: Number
};

export const TimeSlot: Model<TimeSlotDocument> = model('timeslot', TimeSlotSchema);