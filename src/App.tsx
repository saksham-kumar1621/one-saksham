import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PortfolioProvider } from "./context/PortfolioContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { StackPage } from "./pages/StackPage";
import { ContactPage } from "./pages/ContactPage";

const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((module) => ({ default: module.AdminPage }))
);

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <PortfolioProvider>
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
              <Route
                path="/admin"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center bg-bg text-muted font-mono text-xs">
                        Loading One Saksham CMS Engine...
                      </div>
                    }
                  >
                    <AdminPage />
                  </Suspense>
                }
              />
            </Routes>
          </main>

          {/* Global Footer with Marquee & Flipped HLS Video */}
          <Footer />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
