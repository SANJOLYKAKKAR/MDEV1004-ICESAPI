import express from 'express';
const router = express.Router();
import passport from 'passport';

import { 
    DisplayRecipeList, 
    DisplayRecipeById, 
    AddRecipe, 
    UpdateRecipe, 
    DeleteRecipe 
} from '../Controllers/recipe'; 

/* List of Recipe Routes (endpoints) */

/* GET Recipe List - fallback in case /list is not used */
router.get('/', (req, res, next) => {  DisplayRecipeList(req, res, next); });

/* GET Recipe List. */
router.get('/list', (req, res, next) => {  DisplayRecipeList(req, res, next); });

/* GET Recipe by ID. */
router.get('/find/:id', (req, res, next) => {  DisplayRecipeById(req, res, next); });

/* Add Recipe */
router.post('/add', /* passport.authenticate('jwt', {session: false}), */ (req, res, next) => {  AddRecipe(req, res, next); });

/* Update Recipe */
router.put('/update/:id', /* passport.authenticate('jwt', {session: false}), */ (req, res, next) => {  UpdateRecipe(req, res, next); });

/* Delete Recipe */
router.delete('/delete/:id', /* passport.authenticate('jwt', {session: false}), */ (req, res, next) => {  DeleteRecipe(req, res, next); });

export default router;
