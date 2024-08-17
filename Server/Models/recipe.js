"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");

let recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    origin: { type: String },
    preparationTime: { type: Number }, // Duration in minutes
    servingSize: { type: Number }, // Number of servings
    difficulty: { type: String }, // e.g., Easy, Medium, Hard
    calorieCount: { type: Number },
    microNutrients: { type: Map, of: String }, // For storing micronutrients and their values
    sourceURL: { type: String },
    imageURL: { type: String }
});

let Recipe = (0, mongoose_1.model)('Recipe', recipeSchema);
exports.default = Recipe;
//# sourceMappingURL=recipe.js.map
