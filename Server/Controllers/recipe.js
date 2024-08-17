"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRecipeList = DisplayRecipeList;
exports.DisplayRecipeById = DisplayRecipeById;
exports.AddRecipe = AddRecipe;
exports.UpdateRecipe = UpdateRecipe;
exports.DeleteRecipe = DeleteRecipe;
const recipe = __importDefault(require("../Models/recipe")); // Updated import
const Util_1 = require("../Util");

function DisplayRecipeList(req, res, next) {
    recipe.default.find({})
        .then((data) => {
            res.status(200).json({ success: true, msg: "Recipe List Retrieved and Displayed", data: data, token: null });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to retrieve recipes", data: null, token: null });
        });
}

function DisplayRecipeById(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a recipe", data: null, token: null });
    } else {
        recipe.default.findById(id)
            .then((data) => {
                if (data) {
                    res.status(200).json({ success: true, msg: "Recipe Retrieved and Displayed", data: data, token: null });
                } else {
                    res.status(404).json({ success: false, msg: "Recipe not found", data: null, token: null });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Failed to retrieve recipe", data: null, token: null });
            });
    }
}

function AddRecipe(req, res, next) {
    let recipeToAdd = new recipe.default({
        title: req.body.title,
        ingredients: (0, Util_1.SanitizeArray)(req.body.ingredients),
        instructions: req.body.instructions,
        origin: req.body.origin,
        preparationTime: req.body.preparationTime,
        servingSize: req.body.servingSize,
        difficulty: req.body.difficulty,
        calorieCount: req.body.calorieCount,
        microNutrients: (0, Util_1.SanitizeArray)(req.body.microNutrients),
        sourceURL: req.body.sourceURL,
        imageURL: req.body.imageURL
    });

    recipe.default.create(recipeToAdd)
        .then(() => {
            res.status(200).json({ success: true, msg: "Recipe added", data: recipeToAdd, token: null });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to add recipe", data: null, token: null });
        });
}

function UpdateRecipe(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a recipe", data: null, token: null });
    } else {
        let updatedRecipe = {
            title: req.body.title,
            ingredients: (0, Util_1.SanitizeArray)(req.body.ingredients),
            instructions: req.body.instructions,
            origin: req.body.origin,
            preparationTime: req.body.preparationTime,
            servingSize: req.body.servingSize,
            difficulty: req.body.difficulty,
            calorieCount: req.body.calorieCount,
            microNutrients: (0, Util_1.SanitizeArray)(req.body.microNutrients),
            sourceURL: req.body.sourceURL,
            imageURL: req.body.imageURL
        };

        recipe.default.updateOne({ _id: id }, updatedRecipe)
            .then(() => {
                res.status(200).json({ success: true, msg: "Recipe updated", data: updatedRecipe, token: null });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Failed to update recipe", data: null, token: null });
            });
    }
}

function DeleteRecipe(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a recipe", data: null, token: null });
    } else {
        recipe.default.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({ success: true, msg: "Recipe deleted", data: id, token: null });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Failed to delete recipe", data: null, token: null });
            });
    }
}
