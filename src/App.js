import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";

import ProblemStatement from "./pages/ProblemStatements";
import ProblemDetails from "./pages/ProblemDetails";

import Application from "./pages/Application";
import Confirmation from "./pages/confirmation";

import EvaluatorDashboard from "./pages/EvaluatorDashboard";
import AddProblem from "./pages/AddProblem";

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

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Information Pages */}
          <Route path="/about" element={<AboutSection />} />
          <Route path="/guidelines" element={<GuidelinesSection />} />
          <Route path="/faqs" element={<FAQSection />} />
          <Route path="/contact" element={<ContactSection />} />

          {/* Problem Statements */}
          <Route path="/problems" element={<ProblemStatement />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />

          {/* Application Flow */}
          <Route path="/apply/:id" element={<Application />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Evaluator */}
          <Route path="/evaluator" element={<EvaluatorDashboard />} />

          {/* Add Problem Statement */}
          <Route path="/add-problem" element={<AddProblem />} />

        </Routes>

      </main>

      <Footer />

    </Router>
  );

}

export default App;