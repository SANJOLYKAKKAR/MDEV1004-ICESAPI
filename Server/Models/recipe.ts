import { Schema, model } from 'mongoose';

// Recipe Interface - defines the structure of a recipe document
export interface IRecipe {
    title: string;
    ingredients: string[];
    instructions: string;
    origin?: string;
    preparationTime?: number; 
    servingSize?: number; 
    difficulty?: string; 
    calorieCount?: number;
    microNutrients?: Record<string, string>; 
    sourceURL?: string;
    imageURL?: string;
}

// Recipe Schema - defines the structure of a recipe document
let recipeSchema = new Schema<IRecipe>({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    origin: { type: String },
    preparationTime: { type: Number }, 
    servingSize: { type: Number }, 
    difficulty: { type: String }, 
    calorieCount: { type: Number },
    microNutrients: { type: Map, of: String }, 
    sourceURL: { type: String },
    imageURL: { type: String }
});

let Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
