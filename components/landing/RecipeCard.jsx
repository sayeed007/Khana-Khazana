import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from '../ActionButtons';
import EventSchemaScript from '../meta/EventSchemaScript';

const RecipeCard = ({ recipe }) => {

  return (

    <>

      <Link
        className='w-full'
        href={`/details/${recipe?.id}`}
      >
        <div className="card">
          <Image
            src={recipe?.thumbnail}
            className="rounded-md"
            alt={recipe?.name}
            width={500}
            height={500}
          />

          <h4 className="my-2">
            {recipe?.name}
          </h4>

          <div className="py-2 flex justify-between text-xs text-gray-500">
            <span>⭐️ {recipe?.rating}</span>
            <span>By:  {recipe?.author}</span>
          </div>
        </div>
      </Link>


      {/* <div className="overflow-hidden rounded-md bg-[#242526]">
        <EventSchemaScript recipe={recipe} />

        <Image
          src={recipe?.imageUrl}
          alt={recipe?.name}
          className="w-full"
          width={500}
          height={500}
        />

        <div className="p-3">
          <Link href={`/details/${recipe?.id}`} className="font-bold text-lg">
            {recipe?.name}
          </Link>
          <p className="text-[#9C9C9C] text-sm mt-1">
            {recipe?.location}
          </p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{recipe?.interested_ids?.length} Interested</span>
            <span className="mx-1">|</span>
            <span>{recipe?.going_ids?.length} Going</span>
          </div>
          <ActionButtons eventId={recipe?.id} interestedUserIds={recipe?.interested_ids} goingUserIds={recipe?.going_ids} />
        </div> 
      </div >
      */}
    </>




  );
};

export default RecipeCard;
