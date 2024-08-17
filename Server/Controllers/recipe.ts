import { Request, Response, NextFunction } from 'express';

import Recipe from '../Models/recipe';
import { SanitizeArray } from '../Util';

/**
 * This function displays the recipe list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayRecipeList(req: Request, res: Response, next: NextFunction): void
{
    Recipe.find({})
    .then((data) =>
    {
        res.status(200).json({success: true, msg: "Recipe List Retrieved and Displayed", data: data, token: null})
    })
    .catch((err) =>
    {
        console.error(err);
        res.status(500).json({success: false, msg: "Error retrieving recipe list", data: null, token: null});
    })
}

/**
 * This function displays a single recipe by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayRecipeById(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a recipe", data: null, token: null});
    }
    else
    {
        Recipe.findById({_id: id})
        .then((data) =>
        {
            if(data)
            {
                res.status(200).json({success: true, msg: "One Recipe Retrieved and Displayed", data: data, token: null})
            }
            else
            {
                res.status(404).json({success: false, msg: "Recipe not found", data: null, token: null});
            }
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({success: false, msg: "Error retrieving recipe", data: null, token: null});
        })
    }
}

/**
 * This function adds a recipe to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddRecipe(req: Request, res: Response, next: NextFunction): void
{
    let recipe = new Recipe({
        title: req.body.title,
        ingredients: SanitizeArray(req.body.ingredients as string),
        instructions: req.body.instructions,
        origin: req.body.origin,
        preparationTime: req.body.preparationTime,
        servingSize: req.body.servingSize,
        difficulty: req.body.difficulty,
        calorieCount: req.body.calorieCount,
        microNutrients: req.body.microNutrients,
        sourceURL: req.body.sourceURL,
        imageURL: req.body.imageURL
    });

    Recipe.create(recipe)
    .then(() =>
    {
        res.status(200).json({success: true, msg: "Recipe added", data: recipe, token: null});
    })
    .catch((err) =>
    {
        console.error(err);
        res.status(500).json({success: false, msg: "Error adding recipe", data: null, token: null});
    })
}

/**
 * This function updates a recipe in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateRecipe(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to update a recipe", data: null, token: null});
    }
    else
    {
        let updatedRecipe = {
            title: req.body.title,
            ingredients: SanitizeArray(req.body.ingredients as string),
            instructions: req.body.instructions,
            origin: req.body.origin,
            preparationTime: req.body.preparationTime,
            servingSize: req.body.servingSize,
            difficulty: req.body.difficulty,
            calorieCount: req.body.calorieCount,
            microNutrients: req.body.microNutrients,
            sourceURL: req.body.sourceURL,
            imageURL: req.body.imageURL
        };

        Recipe.updateOne({_id: id}, updatedRecipe)
        .then(() =>
        {
            res.status(200).json({success: true, msg: "Recipe updated", data: updatedRecipe, token: null});
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({success: false, msg: "Error updating recipe", data: null, token: null});
        })
    }
}

/**
 * This function deletes a recipe from the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteRecipe(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to delete a recipe", data: null, token: null});
    }
    else
    {
        Recipe.deleteOne({_id: id})
        .then(() =>
        {
            res.status(200).json({success: true, msg: "Recipe deleted", data: id, token: null});
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({success: false, msg: "Error deleting recipe", data: null, token: null});
        })
    }
}
