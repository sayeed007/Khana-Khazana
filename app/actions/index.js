"use server";

import { revalidatePath } from 'next/cache'
import { createUser, findUserByCredentials, getRecipeById, toggleUserFavourite } from "@/db/queries";
import { redirect } from "next/navigation";


async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);


    return JSON.stringify(created);
}

async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get("password");

        const found = await findUserByCredentials(credential);
        return found;
    } catch (error) {
        return error;
    }
}

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId);
    } catch (error) {
        throw error;
    }
    revalidatePath('/');
}

async function addGoingEvent(eventId, user) {
    try {
        await updateGoing(eventId, user?.id);
        await sendEmail(eventId, user);
    } catch (error) {
        throw error;
    }
    revalidatePath('/');
    redirect('/');
}


async function toggleUserFavouriteAction(userID, recipeId) {
    try {

        if (userID && recipeId) {
            const userFavourite = await toggleUserFavourite(userID, recipeId);

            return JSON.stringify(userFavourite);
        }
    } catch (error) {
        return { error: error };
    }
}



export { registerUser, performLogin, addInterestedEvent, addGoingEvent, toggleUserFavouriteAction };
