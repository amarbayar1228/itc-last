import Header from "@/components/header";
import "@/styles/globals.css";
import { Exo_2, Roboto, Ubuntu } from "next/font/google";
const inter = Exo_2({
  subsets: ["latin"],
  weight: "400",
});
export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.className}`}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
