import RecipeCard from "./RecipeCard"
import { getAllRecipes } from "@/db/queries";

const RecipeList = async () => {
  const allRecipes = await getAllRecipes();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">

      {
        allRecipes.map((recipe) => (
          <RecipeCard key={recipe?.id} recipe={recipe} />
        ))
      }

    </div>
  )
}

export default RecipeList