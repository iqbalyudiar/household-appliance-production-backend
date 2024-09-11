import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  id: ObjectId | string | unknown;
  name: string;
  email: string;
  password: string;
  roles: string;
}
