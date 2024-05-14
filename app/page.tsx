import Navbar from "./components/Navbar/Navbar";
import BackgroundCanvas from "./components/BackgroundCanvas";
import ForgroundHtml from "./components/ForgroundHtml";
import ContextProvider from "./context/ContextProvider";
export default function Home() {
  return (
    <ContextProvider>
      <Navbar />
      <div className="mainContainer">
        <BackgroundCanvas />
      </div>
      <ForgroundHtml />
    </ContextProvider>
  );
}
