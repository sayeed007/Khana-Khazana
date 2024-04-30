import { recipeModel } from "@/models/recipes-models";
import { userModel } from "@/models/user-model";
import mongoose from "mongoose";

import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/utils/data-util";


async function getAllRecipesCategory() {
    // const allRecipes = await recipeModel.find().lean();

    // const allCategory = [...new Set(allRecipes.map(item => item.category))];

    // return allCategory;
    try {
        const categories = await recipeModel.distinct("category");

        console.log('All Category: ' + categories);

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

}

async function getAllRecipesByCategory(category) {

    try {

        console.log('Category name for fetching recipes: ' + category);

        let allRecipes = [];

        if (category) {
            const regex = new RegExp(category, "i");
            allRecipes = await recipeModel.find({ category: { $regex: regex } }).lean();
        } else {
            allRecipes = await recipeModel.find().lean();
        }

        return replaceMongoIdInArray(allRecipes);
    } catch (error) {
        console.error("Error fetching category wise recipes:", error);
        return [];
    }
}

async function getAllRecipes() {

    try {
        const allRecipes = await recipeModel.find().lean();

        return replaceMongoIdInArray(allRecipes);
    } catch (error) {
        console.error("Error fetching all recipes:", error);
        return [];
    }
}

async function getRecipeById(recipeId) {

    try {
        console.log('Recipe Id for fetching recipe: ' + recipeId);

        const recipe = await recipeModel?.findById(recipeId)?.lean();
        return replaceMongoIdInObject(recipe);

    } catch (error) {
        console.error("Error fetching specific recipe by recipe id:", error);
        return [];
    }
}

async function createUser(user) {

    try {
        console.log('Creating User with information: ' + user);
        const newUser = await userModel.create(user);
        console.log('User created successfully:', newUser);
        return newUser;

    } catch (error) {
        console.error("Error creating user:", error.message);
        return { error: error.message }; // Return error message
    }
}

async function findUserByCredentials(credentials) {

    try {
        console.log('User Logging in with credentials');

        const user = await userModel.findOne(credentials).lean();

        if (user) {
            return replaceMongoIdInObject(user);
        }
        return { error: 'User with this credentials not found' };

    } catch (error) {
        console.error("Error logging in user:", error.message);
        return { error: error.message }; // Return error message
    }
}


async function toggleUserFavourite(auth, recipeId) {
    try {
        const user = await userModel.findById(auth?.id);

        if (user) {
            const foundIndex = user.favourites.indexOf(recipeId);

            if (foundIndex !== -1) {
                user.favourites.pull(recipeId);
            } else {
                user.favourites.push(recipeId);
            }

            await user.save();

            // Return the updated user data without refetching
            return { favourites: user.favourites };
        } else {
            return { error: 'User not found' };
        }
    } catch (error) {
        console.error('Error toggling user favourite:', error);
        return { error: error };
    }
}











export {
    getAllRecipesCategory,
    getAllRecipesByCategory,
    getAllRecipes,
    getRecipeById,
    createUser,
    findUserByCredentials,
    toggleUserFavourite
};
