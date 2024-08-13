import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/page";
import Provider from "./provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBarProvider from "./progressBarprovider";
import { AuthProvider } from "./authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dream Wedding | Book Your Perfect Venue",
    template: "%s | Dream Wedding",
  },
  description:
    "Dream Wedding is your ultimate destination for planning the perfect wedding. Discover and book top-rated banquet halls, marriage halls, and wedding venues. Connect with professional caterers, photographers, and decorators who will make your special day unforgettable. Enjoy affordable pricing and exceptional service with Dream Wedding, your partner in creating beautiful and memorable wedding experiences.",
  keywords: [
    "Dream Wedding",
    "Wedding Venues",
    "Banquet Halls",
    "Marriage Halls",
    "Affordable Wedding Services",
    "Wedding Caterers",
    "Wedding Photographers",
    "Wedding Decorators",
    "Book Wedding Venue",
    "Wedding Planning",
    "Affordable Wedding",
    "Wedding Services",
    "Dream Wedding Venues",
    "Wedding Halls",
  ],
  twitter: {
    card: "summary_large_image",
  },
  // openGraph: {
  //   images: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dreamwedding.png`,
  //   width: 800,
  //   height: 600,
  // },
  // metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  alternates: {
    canonical: `/`,
  },
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBarProvider>
          <ToastContainer />
          <AuthProvider>
            <Provider>
              <Navbar />
              {children}
              <Footer />
            </Provider>
          </AuthProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
