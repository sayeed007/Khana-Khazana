import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "./providers/AuthProvider";

// import { dbConnect } from "@/services/mongo";
// import connectMongo from "@/services/connectMongo";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "khana-khazana - Home",
  description: "Choose from thousands of recipes, Appropriately integrate technically sound value with scalable infomediaries negotiate sustainable strategic theme areas",
};

export default async function RootLayout({ children }) {

  // await connectMongo();
  // await dbConnect();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
