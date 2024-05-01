import Image from "next/image";

import PrepTime from '@/public/Icons/PrepTime.svg';
import CookTime from '@/public/Icons/CookTime.svg';
import Servings from '@/public/Icons/Servings.svg';

import { getBlurData } from '@/utils/blur-generator';
import { getRecipeById } from "@/db/queries";
import ToggleFavourite from "@/components/details/ToggleFavourite";
import ShareComponent from "@/components/details/ShareComponent";


export async function generateMetadata({ params: { recipeId } }) {
  const recipeInfo = await getRecipeById(recipeId);

  return {
    title: `Khana Khazana - ${recipeInfo?.name}`,
    description: recipeInfo?.description,
    openGraph: {
      images: [recipeInfo?.image]
    }
  }
};


const RecipeDetailsPage = async ({ params: { recipeId } }) => {
  const recipeInfo = await getRecipeById(recipeId);
  const { base64 } = await getBlurData(recipeInfo?.image);




  return (
    <>

      <section>
        <div className="grid grid-cols-12 container gap-8 justify-items-center">

          <div className="col-span-12 md:col-span-6">
            <Image
              key={recipeInfo?.name}
              src={`${recipeInfo?.image}&hash=${recipeId}`}
              alt="Event 1"
              className="h-[450px] mx-auto"
              width={900}
              height={900}
              placeholder="blur"
              blurDataURL={base64} />
          </div>

          <div className="col-span-12 md:col-span-6 py-8 flex flex-col justify-center">
            <h2 className="font-semibold text-4xl lg:w-8/12 leading-10">
              {recipeInfo?.name}
            </h2>
            <p className="text-xs text-[#eb4a36] italic my-2">
              {recipeInfo?.category}
            </p>
            <p className="text-gray-600 text-sm my-6 leading-6">
              {recipeInfo?.description}
            </p>

            <div className="flex gap-4 justify-center divide-x my-12">

              <div className="flex-1 text-center">
                <div className="flex justify-center">
                  <PrepTime
                    alt='Preparation time'
                  />
                </div>
                <h3 className="font-medium text-lg text-gray-700 mt-2">
                  Prep time
                </h3>
                <p className="text-gray-500 text-sm">
                  {recipeInfo?.activeTime}
                </p>
              </div>

              <div className="flex-1 text-center">
                <div className="flex justify-center">
                  <CookTime
                    alt='Cooking time'
                  />
                </div>
                <h3 className="font-medium text-lg text-gray-700 mt-2">
                  Cook time
                </h3>
                <p className="text-gray-500 text-sm">
                  {recipeInfo?.totalTime}
                </p>
              </div>

              <div className="flex-1 text-center">
                <div className="flex justify-center">
                  <Servings
                    alt='Servings'
                  />
                </div>
                <h3 className="font-medium text-lg text-gray-700 mt-2">
                  Servings
                </h3>
                <p className="text-gray-500 text-sm">
                  {recipeInfo?.serves}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <ToggleFavourite
                recipeInfo={recipeInfo}
              />
              <div className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]">

                <ShareComponent
                  recipeInfo={recipeInfo}
                />

              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="container py-12">
          <h3 className="font-semibold text-xl py-6">How to Make it</h3>
          <div>

            {recipeInfo?.steps?.map((step, index) => {
              return (
                <div className="step" key={index}>
                  <h3>Step {index + 1}</h3>
                  <p>
                    {step}
                  </p>
                </div>
              )
            })
            }

          </div>
        </div>
      </section>


    </>
  )
}

export default RecipeDetailsPage