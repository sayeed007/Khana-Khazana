import Header from "@/components/landing/Header";
import RecipeList from "@/components/landing/RecipeList";
import { Suspense } from 'react';
import Loading from "@/components/Loading";
import RecipeCategoryList from "@/components/landing/RecipeCategoryList";

export default function Home() {



  return (


    <>

      <section className="container">
        <div
          className="py-4 rounded-lg p-4 md:p-12 min-h-[450px] bg-cover grid place-items-center grid-cols-12"
          style={{ backgroundImage: "url('/cover.png')" }}
        >
          <div className="col-span-12 md:col-span-6">
            <h1 className="font-bold text-3xl md:text-5xl text-white">
              Choose from thousands of recipes
            </h1>
            <p className="text-white my-4">Appropriately integrate technically sound value with scalable infomediaries
              negotiate
              sustainable strategic
              theme areas</p>
          </div>
        </div>
      </section>


      <section className="container py-8">
        <div className="grid grid-cols-12 py-4">
          <div className="col-span-12 md:col-span-3">
            <h3 className="font-bold text-xl">Recipes</h3>
            <ul className="pl-2 my-6 space-y-4 text-gray-500 text-sm">
              <RecipeCategoryList />
            </ul>
          </div>

          <div className="col-span-12 md:col-span-9">

            <Suspense fallback={<Loading />}>
              <RecipeList />
            </Suspense>

          </div>
        </div>
      </section>

    </>

  );
}
