import { recipeModel } from "@/models/recipes-models";
import { userModel } from "@/models/user-model";

import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/utils/data-util";
import { dbConnect } from "@/services/mongo";
import connectMongo from "@/services/connectMongo";

async function getAllRecipesCategory() {


    try {
        await connectMongo();
        // await dbConnect();

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
        await connectMongo();

        console.log('Category name for fetching recipes: ' + category);

        let allRecipes = [];

        if (category) {
            // const regex = new RegExp(category, "i");
            allRecipes = await recipeModel.find({ category: category }).lean();
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
        await connectMongo();

        const allRecipes = await recipeModel.find().lean();

        return replaceMongoIdInArray(allRecipes);
    } catch (error) {
        console.error("Error fetching all recipes:", error);
        return [];
    }
}

async function getRecipeById(recipeId) {

    try {
        await connectMongo();

        console.log('Recipe Id for fetching recipe: ' + recipeId);

        const recipe = await recipeModel?.findById(recipeId)?.maxTimeMS(30000)?.lean();

        console.log(recipe);
        return replaceMongoIdInObject(recipe);

    } catch (error) {
        console.error("Error fetching specific recipe by recipe id:", error);
        return null;
    }
}

async function createUser(user) {

    try {
        await connectMongo();

        console.log('Creating User with information: ' + user);

        const newUser = await userModel.create(user);

        console.log('User created successfully:', newUser);



        return replaceMongoIdInObject(newUser.toObject());

    } catch (error) {
        console.error("Error creating user:", error.message);
        return { error: error.message }; // Return error message
    }
}

async function findUserByCredentials(credentials) {

    try {
        await connectMongo();

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


async function toggleUserFavourite(userID, recipeId) {
    try {
        await connectMongo();
        console.log(userID)
        const user = await userModel.findById(userID);

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
