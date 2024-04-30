
import Image from "next/image";
import Link from "next/link";
import SignInOut from "./auth/SignInOut";


const Navbar = () => {
  return (
    <>
      <nav>
        <div className="container flex justify-between py-6">
          <a href="/">
            <Image
              src="/logo.png"
              alt="lws-logo"
              className="object-cover h-[40px]"
              width={135}
              height={135}
            />
          </a>

          <ul className="flex gap-4 text-sm text-gray-500">
            <li className="py-2 active">
              <Link href="/">Home</Link>
            </li>

            <li className="py-2">
              <a href="/recipe">Recipe</a>
            </li>

            <li className="py-2">
              <a href="/aboutus">About us</a>
            </li>

            <li className="py-2">
              <SignInOut />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
