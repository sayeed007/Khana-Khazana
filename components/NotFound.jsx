import Image from 'next/image'
import NotFound from '@/public/NotFound.webp'
import Link from 'next/link'


const NotFoundComponent = ({ message }) => {
    return (
        <div className="flex flex-col w-full h-[60vh] justify-center items-center">

            <Image
                src={NotFound}
                alt="Not-Found"
                width={300}
                height={300}
            />
            <div>
                {message}
            </div>

            <div>
                <Link href="/" className="underline text-[#eb4a36]">Back To Home</Link>
            </div>

        </div>
    )
}

export default NotFoundComponent