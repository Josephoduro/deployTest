import { Document, Schema, model, models } from "mongoose";

export interface MMenu extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  ingredients?: string;
  recipe?: string;
  config?: object; 
  transformationUrl?: string; 
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

const MenuSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureURL: { type: String, required: true },
  ingredients: {type: String, required: true},
  recipe: {type: String, required: true},
  config: { type: Object },
  transformationUrl: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Menu = models?.Menu || model('Menu', MenuSchema);

export default Menu;