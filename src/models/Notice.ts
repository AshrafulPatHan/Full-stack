// src/models/Notice.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INotice extends Document {
  title: string;
  description: string;
}

const NoticeSchema = new Schema<INotice>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
