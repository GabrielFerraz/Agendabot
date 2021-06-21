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

export const TimeSlotHistorySchema = new Schema<TimeSlotHistoryDocument, Model<TimeSlotHistoryDocument>>({
  user: String,
  username: String,
  day: Number,
  slot: Number
}, {
  collection: 'timeslot'
});

export interface TimeSlotHistoryDocument extends Document {
  user: String,
  username: String,
  day: Number,
  slot: Number,
  week: Number
};

export const TimeSlotHistory: Model<TimeSlotHistoryDocument> = model('timeslothistory', TimeSlotHistorySchema);