import Navbar from "./components/Navbar/Navbar";
import BackgroundCanvas from "./components/BackgroundCanvas";
import ForgroundHtml from "./components/ForgroundHtml";
import ContextProvider from "./context/ContextProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function Home() {
  return (
    <ContextProvider>
      <Navbar />
      <div className="mainContainer">
        <BackgroundCanvas />
      </div>
      <ForgroundHtml />
      <SpeedInsights />
    </ContextProvider>
  );
}
