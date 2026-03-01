import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProblemStatement from "./pages/ProblemStatements";
import ProblemDetails from "./pages/ProblemDetails";

import Application from "./pages/Application";
import Confirmation from "./pages/confirmation";

import AboutSection from "./sections/AboutSection";
import GuidelinesSection from "./sections/GuidelinesSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/about" element={<AboutSection />} />
          <Route path="/guidelines" element={<GuidelinesSection />} />
          <Route path="/faqs" element={<FAQSection />} />
          <Route path="/contact" element={<ContactSection />} />

          <Route path="/problems" element={<ProblemStatement />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />

          {/* Application Flow */}
          <Route path="/apply/:id" element={<Application />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;