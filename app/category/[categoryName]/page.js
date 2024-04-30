import HeroSection from "@/components/details/HeroSection"
import EventDetails from "@/components/details/EventDetails"
import EventVenue from "@/components/details/EventVenue"
import { getBlurData } from '@/utils/blur-generator';

import { getAllRecipesByCategory, getRecipeById } from "@/db/queries";
import Image from "next/image";
import PrepTime from '@/public/Icons/PrepTime.svg';
import CookTime from '@/public/Icons/CookTime.svg';
import Servings from '@/public/Icons/Servings.svg';
import Favourite from '@/public/Icons/Favourite.svg';
import NonFavourite from '@/public/Icons/NonFavourite.svg';
import Share from '@/public/Icons/Share.svg';
import RecipeCard from "@/components/landing/RecipeCard";


export async function generateMetadata({ params: { categoryName } }) {
  const categoryWiseRecipes = await getAllRecipesByCategory(categoryName);

  // return {
  //   title: `Khana Khazana - ${recipeInfo?.name}`,
  //   description: recipeInfo?.description,
  //   openGraph: {
  //     images: [recipeInfo?.image]
  //   }
  // }
}


const CategoryWiseRecipeListPage = async ({ params: { categoryName } }) => {
  const categoryWiseRecipes = await getAllRecipesByCategory(decodeURIComponent(categoryName));


  return (
    <>

      <section class="container py-8">
        <div>

          <h3 class="font-semibold text-xl">
            {decodeURIComponent(categoryName)}
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">

            {
              categoryWiseRecipes.map((recipe) => (
                <RecipeCard key={recipe?.id} recipe={recipe} />
              ))
            }

          </div>
        </div>
      </section>







    </>
  )
}

export default CategoryWiseRecipeListPage