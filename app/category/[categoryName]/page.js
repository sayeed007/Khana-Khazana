
import { getAllRecipesByCategory } from "@/db/queries";
import RecipeCard from "@/components/landing/RecipeCard";
import NotFoundComponent from "@/components/NotFound";


export async function generateMetadata({ params: { categoryName } }) {
  const categoryWiseRecipes = await getAllRecipesByCategory(decodeURIComponent(categoryName));

  if (categoryWiseRecipes?.length > 0) {
    return {
      title: `Khana Khazana - Category:${categoryName}`,
      description: `Recipes for ${categoryName} & Recipes are: ${(categoryWiseRecipes?.map(recipe => `Name: ${recipe.name}, Description: ${recipe.description}`)).join('\n')}`,

    }
  } else {
    return {
      title: `Khana Khazana`,
      description: `Category not found`,

    }
  }

}


const CategoryWiseRecipeListPage = async ({ params: { categoryName } }) => {
  const categoryWiseRecipes = await getAllRecipesByCategory(decodeURIComponent(categoryName));


  console.log(categoryWiseRecipes);

  return (
    <>

      {categoryWiseRecipes?.length > 0 ?
        <section className="container py-8">
          <div>

            <h3 className="font-semibold text-xl">
              {decodeURIComponent(categoryName)}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">

              {
                categoryWiseRecipes.map((recipe) => (
                  <RecipeCard key={recipe?.id} recipe={recipe} />
                ))
              }

            </div>
          </div>
        </section>
        :
        <NotFoundComponent
          message={`No recipe with category name ${categoryName} is found.`}
        />
      }
    </>
  )
}

export default CategoryWiseRecipeListPage