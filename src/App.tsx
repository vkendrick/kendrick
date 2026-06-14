import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import Casos from "./pages/Casos";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/casos" element={<Casos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  );
}
