import Link from "next/link";
import { getAllRecipesCategory } from "@/db/queries";

const RecipeCategoryList = async () => {
    const allRecipesCategory = await getAllRecipesCategory();

    return (
        <>
            {
                allRecipesCategory.map((recipe) => {

                    return (
                        <li key={recipe}>
                            <Link
                                href={`/category/${recipe}`}
                            >
                                {recipe}
                            </Link>
                        </li>
                    )
                })
            }
        </>
    )
}

export default RecipeCategoryList