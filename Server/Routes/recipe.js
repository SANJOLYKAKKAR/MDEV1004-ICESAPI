"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipe = require("../Controllers/recipe"); 

// Define routes for recipe operations
router.get('/', (req, res, next) => { recipe.DisplayRecipeList(req, res, next); });
router.get('/list', (req, res, next) => { recipe.DisplayRecipeList(req, res, next); });
router.get('/find/:id', (req, res, next) => { recipe.DisplayRecipeById(req, res, next); });
router.post('/add', (req, res, next) => { recipe.AddRecipe(req, res, next); });
router.put('/update/:id', (req, res, next) => { recipe.UpdateRecipe(req, res, next); });
router.delete('/delete/:id', (req, res, next) => { recipe.DeleteRecipe(req, res, next); });

exports.default = router;
