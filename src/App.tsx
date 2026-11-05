import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { StackPage } from "./pages/StackPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/20 selection:text-white flex flex-col justify-between">
        {/* Loading Screen on Initial Visit */}
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Global Persistent Floating Navbar */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/stack" element={<StackPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Global Footer with Marquee & Flipped HLS Video */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
