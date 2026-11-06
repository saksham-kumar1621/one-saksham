import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  ArrowUpRight,
  Database,
  User,
  FolderGit2,
  Sparkles,
  Layers,
  Inbox,
  Settings,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Key,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  saveFirebaseConfig,
  clearFirebaseConfig,
  getActiveFirebaseConfig,
  type FirebaseConfigObject,
} from "../lib/firebase";
import type { ProjectItem, ExplorationItem } from "../data/portfolioData";
import { PinterestIcon } from "../components/icons/PinterestIcon";
import { GithubIcon } from "../components/icons/GithubIcon";

export const AdminPage: React.FC = () => {
  const {
    personalInfo,
    projects,
    techStack,
    explorations,
    messages,
    isFirebaseConnected,
    updatePersonalInfo,
    addProject,
    updateProject,
    deleteProject,
    addExploration,
    updateExploration,
    deleteExploration,
    updateTechStack,
    deleteContactMessage,
    seedFirebase,
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("onesaksham_auth") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation Tab
  const [activeTab, setActiveTab] = useState<
    "profile" | "projects" | "explorations" | "stack" | "messages" | "firebase"
  >("profile");

  // Notification Banner
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: personalInfo.name,
    fullName: personalInfo.fullName,
    tagline: personalInfo.tagline,
    role: personalInfo.role,
    location: personalInfo.location,
    status: personalInfo.status,
    bio: personalInfo.bio,
    email: personalInfo.email,
    github: personalInfo.github,
    pinterest: personalInfo.pinterest,
    avatar: personalInfo.avatar,
    rolesCycle: personalInfo.rolesCycle.join(", "),
  });

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    name: "",
    title: "",
    tagline: "",
    description: "",
    category: "Full Stack",
    language: "TypeScript",
    tags: [],
    stars: 0,
    githubUrl: "",
    liveUrl: "",
    featured: true,
    image: "",
  });
  const [projectTagsInput, setProjectTagsInput] = useState("");

  // Exploration Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<Partial<ExplorationItem>>({
    title: "",
    category: "Dark Aesthetic",
    image: "",
    pinUrl: "",
    rotation: 0,
  });

  // Firebase Config Form State
  const activeCfg = getActiveFirebaseConfig();
  const [fbConfigForm, setFbConfigForm] = useState<FirebaseConfigObject>({
    apiKey: activeCfg?.apiKey || "",
    authDomain: activeCfg?.authDomain || "",
    projectId: activeCfg?.projectId || "",
    storageBucket: activeCfg?.storageBucket || "",
    messagingSenderId: activeCfg?.messagingSenderId || "",
    appId: activeCfg?.appId || "",
  });

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcodes: 'onesaksham' or 'admin123' or 'saksham'
    if (
      passcode.trim() === "onesaksham" ||
      passcode.trim() === "admin123" ||
      passcode.trim() === "saksham" ||
      passcode.trim() === "1621"
    ) {
      sessionStorage.setItem("onesaksham_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Default passcode is 'onesaksham'");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("onesaksham_auth");
    setIsAuthenticated(false);
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const rolesArray = profileForm.rolesCycle
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    await updatePersonalInfo({
      ...profileForm,
      rolesCycle: rolesArray.length > 0 ? rolesArray : personalInfo.rolesCycle,
    });
    showToast("Profile & Brand details saved successfully!");
  };

  // Open Project Modal
  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      name: "",
      title: "",
      tagline: "",
      description: "",
      category: "Full Stack",
      language: "TypeScript",
      stars: 0,
      githubUrl: "https://github.com/saksham-kumar1621/",
      liveUrl: "",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    });
    setProjectTagsInput("React, TypeScript, Tailwind");
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setProjectForm(proj);
    setProjectTagsInput(proj.tags.join(", "));
    setIsProjectModalOpen(true);
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = projectTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProjectId) {
      await updateProject(editingProjectId, { ...projectForm, tags });
      showToast("Project updated successfully!");
    } else {
      await addProject({
        name: projectForm.name || (projectForm.title?.toLowerCase().replace(/\s+/g, "-") || "project"),
        title: projectForm.title || "New Project",
        tagline: projectForm.tagline || "",
        description: projectForm.description || "",
        category: (projectForm.category as any) || "Full Stack",
        language: projectForm.language || "TypeScript",
        tags,
        stars: Number(projectForm.stars) || 0,
        githubUrl: projectForm.githubUrl || "",
        liveUrl: projectForm.liveUrl || "",
        featured: Boolean(projectForm.featured),
        image: projectForm.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
      });
      showToast("New project added to portfolio!");
    }
    setIsProjectModalOpen(false);
  };

  // Open Exploration Modal
  const openNewExpModal = () => {
    setEditingExpId(null);
    setExpForm({
      title: "",
      category: "Dark Aesthetic",
      image: "https://i.pinimg.com/736x/c2/09/c4/c209c425e1996d696b86f3f054c31099.jpg",
      pinUrl: "https://www.pinterest.com/pin/1105633777378728765/",
      rotation: 0,
    });
    setIsExpModalOpen(true);
  };

  const openEditExpModal = (item: ExplorationItem) => {
    setEditingExpId(item.id);
    setExpForm(item);
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpId) {
      await updateExploration(editingExpId, expForm);
      showToast("Visual pin updated!");
    } else {
      await addExploration({
        title: expForm.title || "Artwork Pin",
        category: expForm.category || "Dark Aesthetic",
        image: expForm.image || "",
        pinUrl: expForm.pinUrl || "https://in.pinterest.com/OneSaksham1621/",
        rotation: Number(expForm.rotation) || 0,
      });
      showToast("New artwork pin added to Visual Playground!");
    }
    setIsExpModalOpen(false);
  };

  // Save Custom Firebase Config
  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbConfigForm.apiKey || !fbConfigForm.projectId) {
      showToast("API Key and Project ID are required!", "error");
      return;
    }
    saveFirebaseConfig(fbConfigForm);
    showToast("Firebase credentials saved! Reloading connection...");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const handleClearFirebaseConfig = () => {
    if (confirm("Reset Firebase config to local environment variables?")) {
      clearFirebaseConfig();
      showToast("Cleared custom config. Reloading...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Seed Firebase Trigger
  const handleSeed = async () => {
    if (
      confirm(
        "Upload all current projects, Pinterest art pins, profile data, and tech stack into your Firebase Firestore?"
      )
    ) {
      const res = await seedFirebase();
      showToast(res.message, res.success ? "success" : "error");
    }
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 flex items-center justify-center bg-bg relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-surface border border-stroke shadow-2xl relative z-10"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-stroke flex items-center justify-center mb-6 text-text-primary">
            <Lock className="w-5 h-5 text-white" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted block mb-1">
            Access Control
          </span>
          <h1 className="text-3xl font-display italic text-text-primary mb-2">
            One Saksham CMS
          </h1>
          <p className="text-xs text-muted leading-relaxed mb-6">
            Enter your passcode to manage projects, Pinterest artwork, live brand copy, and view messages.
          </p>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-muted block mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: onesaksham)"
                className="w-full px-4 py-3 rounded-xl bg-bg border border-stroke text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-white/40 transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stroke/60 text-center">
            <Link
              to="/"
              className="text-xs text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Back to Portfolio</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto bg-bg text-text-primary">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl border text-xs font-medium backdrop-blur-xl shadow-2xl flex items-center gap-2.5 ${
              toast.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-200"
                : "bg-red-950/80 border-red-500/40 text-red-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stroke mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted">
              Live Backend Control Panel
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display italic tracking-tight text-text-primary">
            One Saksham // CMS Engine
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border ${
              isFirebaseConnected
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isFirebaseConnected ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span>{isFirebaseConnected ? "Firestore Live" : "Local / Offline Mode"}</span>
          </div>

          {/* Seed Firebase Button */}
          <button
            onClick={handleSeed}
            title="Upload all default data into your Firebase Firestore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface hover:bg-surface/80 border border-stroke text-xs text-text-primary hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Seed to Firebase</span>
          </button>

          {/* View Live Portfolio */}
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface hover:bg-surface/80 border border-stroke text-xs text-text-primary hover:border-white/40 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Site</span>
            <ExternalLink className="w-3 h-3 text-muted" />
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 pb-2 border-b border-stroke/60">
        {[
          { id: "profile", label: "Profile & Brand", icon: User },
          { id: "projects", label: `Projects (${projects.length})`, icon: FolderGit2 },
          { id: "explorations", label: `Visual Playground (${explorations.length})`, icon: Sparkles },
          { id: "stack", label: "Tech Stack", icon: Layers },
          { id: "messages", label: `Inquiries (${messages.length})`, icon: Inbox },
          { id: "firebase", label: "Firebase Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-lg"
                  : "bg-surface hover:bg-surface/80 text-muted hover:text-text-primary border border-stroke"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: PROFILE & BRAND */}
      {/* ========================================================= */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="p-6 md:p-8 rounded-3xl bg-surface border border-stroke">
            <h2 className="text-xl font-display italic text-text-primary mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span>Personal Identity & Hero Copy</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Full Name / Alias
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Tagline (Main Hero Quote)
                </label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Rotating Roles (Comma Separated for Hero Typer)
                </label>
                <input
                  type="text"
                  value={profileForm.rolesCycle}
                  onChange={(e) => setProfileForm({ ...profileForm, rolesCycle: e.target.value })}
                  placeholder="Full Stack Developer, UI/UX Designer, Desktop App Builder"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Primary Role
                </label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Location (Shown on Contact Clock)
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Availability Status Pill
                </label>
                <input
                  type="text"
                  value={profileForm.status}
                  onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Bio / Philosophy
                </label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Social Links & Contact Info */}
          <div className="p-6 md:p-8 rounded-3xl bg-surface border border-stroke">
            <h2 className="text-xl font-display italic text-text-primary mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-400" />
              <span>Contact & Social Presence</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                  Avatar / Profile Photo URL
                </label>
                <input
                  type="text"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2 flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile Link</span>
                </label>
                <input
                  type="text"
                  value={profileForm.github}
                  onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-muted block mb-2 flex items-center gap-1.5">
                  <PinterestIcon className="w-3.5 h-3.5 text-red-500" />
                  <span>Pinterest Profile Link</span>
                </label>
                <input
                  type="text"
                  value={profileForm.pinterest}
                  onChange={(e) => setProfileForm({ ...profileForm, pinterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-xl cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PROJECTS MANAGER */}
      {/* ========================================================= */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display italic text-text-primary">
              All Portfolio Projects ({projects.length})
            </h2>
            <button
              onClick={openNewProjectModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-3xl bg-surface border border-stroke flex flex-col justify-between group hover:border-white/30 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-black/40 relative">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {proj.featured && (
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-cyan-400 text-black text-[10px] font-mono uppercase font-bold tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono uppercase text-muted tracking-wider block mb-1">
                    {proj.category} • {proj.language}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{proj.title}</h3>
                  <p className="text-xs text-muted line-clamp-2 mb-3 leading-relaxed">
                    {proj.tagline || proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-stroke text-[10px] text-muted font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stroke/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-text-primary transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          showToast("Project deleted");
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-text-primary inline-flex items-center gap-1 font-mono"
                  >
                    <span>Repo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: VISUAL PLAYGROUND (PINTEREST PINS) */}
      {/* ========================================================= */}
      {activeTab === "explorations" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display italic text-text-primary">
                Visual Playground Artwork ({explorations.length})
              </h2>
              <p className="text-xs text-muted">
                These pins are displayed on the 300vh parallax scroll section of the homepage.
              </p>
            </div>
            <button
              onClick={openNewExpModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Art Pin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {explorations.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-3xl bg-surface border border-stroke flex flex-col justify-between group hover:border-red-500/40 transition-all"
              >
                <div>
                  <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-black relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-red-500 border border-white/10">
                      <PinterestIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-muted tracking-wider block mb-1">
                    {exp.category} • Tilt: {exp.rotation}°
                  </span>
                  <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-1">
                    {exp.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stroke/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditExpModal(exp)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove pin "${exp.title}"?`)) {
                          deleteExploration(exp.id);
                          showToast("Pin removed");
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <a
                    href={exp.pinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-mono"
                  >
                    <span>View Pin</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: TECH STACK */}
      {/* ========================================================= */}
      {activeTab === "stack" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display italic text-text-primary">
                Tech Stack Architecture
              </h2>
              <p className="text-xs text-muted">
                Shown on both the homepage Bento-Grid and the full blueprint page (/stack).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((cat, idx) => (
              <div key={cat.category} className="p-6 rounded-3xl bg-surface border border-stroke">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono uppercase tracking-widest font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    {cat.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg border border-stroke text-xs text-text-primary font-mono"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => {
                          const updated = [...techStack];
                          updated[idx].skills = updated[idx].skills.filter((_, i) => i !== sIdx);
                          updateTechStack(updated);
                          showToast(`Removed ${skill}`);
                        }}
                        className="text-muted hover:text-red-400 transition-colors ml-1 cursor-pointer"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Skill to category */}
                <div className="pt-4 border-t border-stroke/60">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const input = form.elements.namedItem("newSkill") as HTMLInputElement;
                      const val = input.value.trim();
                      if (val) {
                        const updated = [...techStack];
                        updated[idx].skills.push(val);
                        updateTechStack(updated);
                        input.value = "";
                        showToast(`Added ${val} to ${cat.category}`);
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      name="newSkill"
                      type="text"
                      placeholder="Add skill..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-bg border border-stroke text-xs text-text-primary focus:outline-none focus:border-white/40"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-text-primary cursor-pointer"
                    >
                      +
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: INCOMING INQUIRIES / MESSAGES */}
      {/* ========================================================= */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display italic text-text-primary">
                Visitor Inquiries & Contact Form Submissions ({messages.length})
              </h2>
              <p className="text-xs text-muted">
                Direct messages submitted via the /contact page are automatically synced here.
              </p>
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 rounded-3xl bg-surface border border-stroke text-center">
              <Inbox className="w-10 h-10 text-muted mx-auto mb-3 opacity-50" />
              <p className="text-sm text-text-primary font-medium mb-1">No inquiries yet</p>
              <p className="text-xs text-muted">
                When someone submits the contact form, their message will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 rounded-3xl bg-surface border border-stroke flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-text-primary">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-mono text-cyan-400 hover:underline"
                      >
                        {msg.email}
                      </a>
                      <span className="text-[10px] font-mono text-muted">
                        {new Date(msg.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-text-primary mb-2">
                      Subject: {msg.subject}
                    </h4>

                    <p className="text-sm text-muted bg-bg/50 p-4 rounded-2xl border border-stroke/60 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-center gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                        msg.subject || "Portfolio Inquiry"
                      )}`}
                      className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Reply Email
                    </a>
                    <button
                      onClick={() => {
                        if (confirm("Delete this message?")) {
                          deleteContactMessage(msg.id);
                          showToast("Message deleted");
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: FIREBASE SETTINGS & SYNC */}
      {/* ========================================================= */}
      {activeTab === "firebase" && (
        <div className="space-y-8">
          <div className="p-6 md:p-8 rounded-3xl bg-surface border border-stroke">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-display italic text-text-primary mb-1 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  <span>Firebase Project Configuration</span>
                </h2>
                <p className="text-xs text-muted">
                  Connect your Firebase project to enable dynamic cloud persistence, or test with local storage.
                </p>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-mono border ${
                  isFirebaseConnected
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                }`}
              >
                {isFirebaseConnected ? "Connected" : "Not Connected"}
              </div>
            </div>

            <form onSubmit={handleSaveFirebaseConfig} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    API Key (apiKey)
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.apiKey}
                    onChange={(e) => setFbConfigForm({ ...fbConfigForm, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    Project ID (projectId)
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.projectId}
                    onChange={(e) =>
                      setFbConfigForm({ ...fbConfigForm, projectId: e.target.value })
                    }
                    placeholder="one-saksham-xxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    Auth Domain
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.authDomain}
                    onChange={(e) =>
                      setFbConfigForm({ ...fbConfigForm, authDomain: e.target.value })
                    }
                    placeholder="one-saksham-xxx.firebaseapp.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    Storage Bucket
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.storageBucket}
                    onChange={(e) =>
                      setFbConfigForm({ ...fbConfigForm, storageBucket: e.target.value })
                    }
                    placeholder="one-saksham-xxx.appspot.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    Messaging Sender ID
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.messagingSenderId}
                    onChange={(e) =>
                      setFbConfigForm({ ...fbConfigForm, messagingSenderId: e.target.value })
                    }
                    placeholder="123456789"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-2">
                    App ID (appId)
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.appId}
                    onChange={(e) => setFbConfigForm({ ...fbConfigForm, appId: e.target.value })}
                    placeholder="1:123456789:web:abcdef"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stroke/60">
                <button
                  type="button"
                  onClick={handleClearFirebaseConfig}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono transition-colors cursor-pointer"
                >
                  Clear Custom Config
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSeed}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Upload & Seed Data to Firestore</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-xl cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Connect Firebase</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Setup Guide & Security Rules */}
          <div className="p-6 md:p-8 rounded-3xl bg-surface border border-stroke">
            <h3 className="text-lg font-display italic text-text-primary mb-3">
              Firestore Security Rules (Recommended)
            </h3>
            <p className="text-xs text-muted mb-4 leading-relaxed">
              Firebase Console me <strong>Firestore Database</strong> ➔ <strong>Rules</strong> me ye rules paste kar do taaki public portfolio data read ho sake aur inquiries submit ho sakein:
            </p>

            <pre className="p-4 rounded-2xl bg-bg text-xs font-mono text-cyan-300 border border-stroke overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read profile, projects, explorations, tech stack
    match /settings/{docId} {
      allow read: if true;
      allow write: if true; // or request.auth != null for strict auth
    }
    match /projects/{docId} {
      allow read: if true;
      allow write: if true;
    }
    match /explorations/{docId} {
      allow read: if true;
      allow write: if true;
    }
    // Anyone can send a message; only admin can read/delete
    match /messages/{docId} {
      allow create: if true;
      allow read, update, delete: if true;
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl bg-surface border border-stroke shadow-2xl relative"
            >
              <h2 className="text-2xl font-display italic text-text-primary mb-6">
                {editingProjectId ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. ModVault"
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Category
                    </label>
                    <select
                      value={projectForm.category || "Full Stack"}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, category: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Tools & Desktop">Tools & Desktop</option>
                      <option value="Games & Realtime">Games & Realtime</option>
                      <option value="Creative UI">Creative UI</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={projectForm.tagline || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      placeholder="One line catchy punch"
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.description || ""}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Primary Language / Tech
                    </label>
                    <input
                      type="text"
                      value={projectForm.language || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, language: e.target.value })}
                      placeholder="e.g. TypeScript / Rust"
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      GitHub Stars Display
                    </label>
                    <input
                      type="number"
                      value={projectForm.stars || 0}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, stars: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={projectTagsInput}
                      onChange={(e) => setProjectTagsInput(e.target.value)}
                      placeholder="React, Next.js, Desktop, Mod Engine"
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.githubUrl || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Live Demo URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.liveUrl || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.image || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="featCheck"
                      checked={Boolean(projectForm.featured)}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                    />
                    <label htmlFor="featCheck" className="text-xs text-text-primary cursor-pointer">
                      Feature on Homepage Selected Works
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-stroke/60">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT EXPLORATION PIN */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 md:p-8 rounded-3xl bg-surface border border-stroke shadow-2xl relative"
            >
              <h2 className="text-2xl font-display italic text-text-primary mb-6">
                {editingExpId ? "Edit Art Pin" : "Add Art Pin"}
              </h2>

              <form onSubmit={handleSaveExp} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                    Pin Title
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.title || ""}
                    onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                    placeholder="e.g. Dark Aesthetic Lord Krishna"
                    className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                    Category Badge
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.category || ""}
                    onChange={(e) => setExpForm({ ...expForm, category: e.target.value })}
                    placeholder="e.g. Divine Cosmic Art"
                    className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                    Pinterest Pin Link (URL)
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.pinUrl || ""}
                    onChange={(e) => setExpForm({ ...expForm, pinUrl: e.target.value })}
                    placeholder="https://www.pinterest.com/pin/..."
                    className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                    Image CDN URL (i.pinimg.com or unplash)
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.image || ""}
                    onChange={(e) => setExpForm({ ...expForm, image: e.target.value })}
                    placeholder="https://i.pinimg.com/736x/..."
                    className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-muted block mb-1">
                    Parallax Tilt Angle in Degrees (-5 to 5)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={expForm.rotation || 0}
                    onChange={(e) =>
                      setExpForm({ ...expForm, rotation: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-bg border border-stroke text-sm text-text-primary focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-stroke/60">
                  <button
                    type="button"
                    onClick={() => setIsExpModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Save Pin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
