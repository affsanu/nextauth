import "./globals.css";
import "react-toastify/dist/ReactToastify.css"
import { Pathway_Extreme } from "next/font/google";
import { ThemeProvider } from "./components/MaterialCom";
import TopMenu from "./components/Header";
import Footer from "./components/Footer";

const CustomFonts = Pathway_Extreme({
  weight: ['100', '400', '700'],
  subsets: ['latin-ext']
});

export const metadata = {
  title: "Sanu Islam",
  description: "This is sanu islam personal portfolio website, sanu islam live in saidpur, sanu islam founder of saidpurnews.com",
  keywords: "sanu islam, sanu, saidpur, saidpurnews.com saidpur news, founder of saidpur news, nilphamari, web development, web design, javascript, react, node, html, css",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={CustomFonts.className}>
        <ThemeProvider>
          <TopMenu />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
