import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  PERSONAL_INFO,
  PROJECTS,
  TECH_STACK,
  DEFAULT_EXPLORATIONS,
  type PersonalInfo,
  type ProjectItem,
  type SkillCategory,
  type ExplorationItem,
  type ContactMessage,
} from "../data/portfolioData";
import {
  db,
  initFirebase,
  getActiveFirebaseConfig,
} from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  projects: ProjectItem[];
  techStack: SkillCategory[];
  explorations: ExplorationItem[];
  messages: ContactMessage[];
  isLoading: boolean;
  isFirebaseConnected: boolean;
  activeSource: "firebase" | "cache" | "default";
  // Actions
  updatePersonalInfo: (data: Partial<PersonalInfo>) => Promise<boolean>;
  addProject: (project: Omit<ProjectItem, "id"> & { id?: string }) => Promise<boolean>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  addExploration: (item: Omit<ExplorationItem, "id"> & { id?: string }) => Promise<boolean>;
  updateExploration: (id: string, item: Partial<ExplorationItem>) => Promise<boolean>;
  deleteExploration: (id: string) => Promise<boolean>;
  updateTechStack: (categories: SkillCategory[]) => Promise<boolean>;
  submitContactMessage: (msg: { name: string; email: string; subject?: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  deleteContactMessage: (id: string) => Promise<boolean>;
  seedFirebase: () => Promise<{ success: boolean; message: string }>;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = "onesaksham_";

function getCached<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`);
    if (!item) return fallback;
    const parsed = JSON.parse(item);

    // If reading projects, ensure bundled /projects/ assets and fallback logo are synced
    if (key === "projects" && Array.isArray(parsed) && Array.isArray(fallback)) {
      return parsed.map((p: any) => {
        const defaultProj = (fallback as any[]).find((f: any) => f.id === p.id);
        if (
          defaultProj &&
          defaultProj.image?.startsWith("/projects/") &&
          (!p.image ||
            p.image.includes("raw.githubusercontent.com") ||
            p.image.includes("images.unsplash.com"))
        ) {
          return { ...p, image: defaultProj.image };
        }
        // If minecraft-port-forwarder has a raw logo stored as image, clear it so it activates auto-fallback
        if (p.id === "minecraft-port-forwarder" && p.image?.includes("raw.githubusercontent.com")) {
          return { ...p, image: "" };
        }
        return p;
      }) as unknown as T;
    }

    return parsed;
  } catch {
    return fallback;
  }
}

function setCached<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Ignore quota issues
  }
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() =>
    getCached("profile", PERSONAL_INFO)
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    getCached("projects", PROJECTS)
  );
  const [techStack, setTechStack] = useState<SkillCategory[]>(() =>
    getCached("tech_stack", TECH_STACK)
  );
  const [explorations, setExplorations] = useState<ExplorationItem[]>(() =>
    getCached("explorations", DEFAULT_EXPLORATIONS)
  );
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    getCached("messages", [])
  );
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSource, setActiveSource] = useState<"firebase" | "cache" | "default">("default");

  // Load from Firebase Firestore
  const loadFirebaseData = useCallback(async () => {
    const { db: activeDb, isConfigured } = initFirebase();
    if (!isConfigured || !activeDb) {
      setIsFirebaseConnected(false);
      setIsLoading(false);
      setActiveSource(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}profile`) ? "cache" : "default");
      return;
    }

    try {
      setIsFirebaseConnected(true);

      // 1. Profile Doc
      const profileRef = doc(activeDb, "settings", "profile");
      const unsubProfile = onSnapshot(
        profileRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as PersonalInfo;
            setPersonalInfo(data);
            setCached("profile", data);
            setActiveSource("firebase");
          }
        },
        (err) => console.warn("Firestore profile snapshot notice:", err.message)
      );

      // 2. Projects Collection
      const projectsCol = collection(activeDb, "projects");
      const unsubProjects = onSnapshot(
        projectsCol,
        (snap) => {
          if (!snap.empty) {
            const list: ProjectItem[] = [];
            snap.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectItem, "id">) });
            });
            setProjects(list);
            setCached("projects", list);
            setActiveSource("firebase");
          }
        },
        (err) => console.warn("Firestore projects snapshot notice:", err.message)
      );

      // 3. Explorations Collection
      const expCol = collection(activeDb, "explorations");
      const unsubExp = onSnapshot(
        expCol,
        (snap) => {
          if (!snap.empty) {
            const list: ExplorationItem[] = [];
            snap.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ExplorationItem, "id">) });
            });
            setExplorations(list);
            setCached("explorations", list);
            setActiveSource("firebase");
          }
        },
        (err) => console.warn("Firestore explorations snapshot notice:", err.message)
      );

      // 4. Messages Collection (For Admin inbox)
      const msgCol = collection(activeDb, "messages");
      const unsubMsg = onSnapshot(
        msgCol,
        (snap) => {
          const list: ContactMessage[] = [];
          snap.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ContactMessage, "id">) });
          });
          list.sort((a, b) => b.createdAt - a.createdAt);
          setMessages(list);
          setCached("messages", list);
        },
        (err) => console.warn("Firestore messages snapshot notice:", err.message)
      );

      // 5. Tech Stack
      const stackRef = doc(activeDb, "settings", "tech_stack");
      const unsubStack = onSnapshot(
        stackRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data && Array.isArray(data.categories)) {
              setTechStack(data.categories);
              setCached("tech_stack", data.categories);
            }
          }
        },
        (err) => console.warn("Firestore tech stack snapshot notice:", err.message)
      );

      setIsLoading(false);

      return () => {
        unsubProfile();
        unsubProjects();
        unsubExp();
        unsubMsg();
        unsubStack();
      };
    } catch (err) {
      console.warn("Could not connect to Firestore, using offline fallback:", err);
      setIsFirebaseConnected(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFirebaseData();
  }, [loadFirebaseData]);

  // Update Personal Info
  const updatePersonalInfo = async (data: Partial<PersonalInfo>): Promise<boolean> => {
    const updated = { ...personalInfo, ...data };
    setPersonalInfo(updated);
    setCached("profile", updated);

    if (db && isFirebaseConnected) {
      try {
        const profileRef = doc(db, "settings", "profile");
        await setDoc(profileRef, updated, { merge: true });
        return true;
      } catch (e) {
        console.error("Firestore update failed:", e);
      }
    }
    return true;
  };

  // Projects CRUD
  const addProject = async (project: Omit<ProjectItem, "id"> & { id?: string }): Promise<boolean> => {
    const newId = project.id || `proj-${Date.now()}`;
    const newProject: ProjectItem = { ...project, id: newId };
    const updated = [newProject, ...projects];
    setProjects(updated);
    setCached("projects", updated);

    if (db && isFirebaseConnected) {
      try {
        await setDoc(doc(db, "projects", newId), newProject);
        return true;
      } catch (e) {
        console.error("Firestore add project error:", e);
        return false;
      }
    }
    return true;
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>): Promise<boolean> => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...project } : p));
    setProjects(updated);
    setCached("projects", updated);

    if (db && isFirebaseConnected) {
      try {
        await updateDoc(doc(db, "projects", id), project as any);
        return true;
      } catch (e) {
        console.error("Firestore update project error:", e);
        return false;
      }
    }
    return true;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    setCached("projects", updated);

    if (db && isFirebaseConnected) {
      try {
        await deleteDoc(doc(db, "projects", id));
        return true;
      } catch (e) {
        console.error("Firestore delete project error:", e);
      }
    }
    return true;
  };

  // Explorations CRUD
  const addExploration = async (item: Omit<ExplorationItem, "id"> & { id?: string }): Promise<boolean> => {
    const newId = item.id || `exp-${Date.now()}`;
    const newItem: ExplorationItem = { ...item, id: newId };
    const updated = [...explorations, newItem];
    setExplorations(updated);
    setCached("explorations", updated);

    if (db && isFirebaseConnected) {
      try {
        await setDoc(doc(db, "explorations", newId), newItem);
        return true;
      } catch (e) {
        console.error("Firestore add exploration error:", e);
      }
    }
    return true;
  };

  const updateExploration = async (id: string, item: Partial<ExplorationItem>): Promise<boolean> => {
    const updated = explorations.map((e) => (e.id === id ? { ...e, ...item } : e));
    setExplorations(updated);
    setCached("explorations", updated);

    if (db && isFirebaseConnected) {
      try {
        await updateDoc(doc(db, "explorations", id), item as any);
        return true;
      } catch (e) {
        console.error("Firestore update exploration error:", e);
      }
    }
    return true;
  };

  const deleteExploration = async (id: string): Promise<boolean> => {
    const updated = explorations.filter((e) => e.id !== id);
    setExplorations(updated);
    setCached("explorations", updated);

    if (db && isFirebaseConnected) {
      try {
        await deleteDoc(doc(db, "explorations", id));
        return true;
      } catch (e) {
        console.error("Firestore delete exploration error:", e);
      }
    }
    return true;
  };

  // Tech Stack
  const updateTechStack = async (categories: SkillCategory[]): Promise<boolean> => {
    setTechStack(categories);
    setCached("tech_stack", categories);

    if (db && isFirebaseConnected) {
      try {
        await setDoc(doc(db, "settings", "tech_stack"), { categories });
        return true;
      } catch (e) {
        console.error("Firestore update stack error:", e);
      }
    }
    return true;
  };

  // Submit Contact Message (From /contact)
  const submitContactMessage = async (msg: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const messageDoc: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject || "General Inquiry",
      message: msg.message,
      createdAt: Date.now(),
      read: false,
    };

    if (db && isFirebaseConnected) {
      try {
        await addDoc(collection(db, "messages"), messageDoc);
        return { success: true };
      } catch (err: any) {
        console.error("Failed to save to Firestore:", err);
        // Fallback to local cache
        const updated = [messageDoc, ...messages];
        setMessages(updated);
        setCached("messages", updated);
        return { success: true };
      }
    } else {
      // Local cache mode
      const updated = [messageDoc, ...messages];
      setMessages(updated);
      setCached("messages", updated);
      return { success: true };
    }
  };

  const deleteContactMessage = async (id: string): Promise<boolean> => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setCached("messages", updated);

    if (db && isFirebaseConnected) {
      try {
        await deleteDoc(doc(db, "messages", id));
        return true;
      } catch (e) {
        console.error("Failed to delete message:", e);
      }
    }
    return true;
  };

  // 1-Click Seed Firebase
  const seedFirebase = async (): Promise<{ success: boolean; message: string }> => {
    const config = getActiveFirebaseConfig();
    if (!config) {
      return {
        success: false,
        message: "Firebase is not configured! Please enter your Firebase keys in the Settings tab first.",
      };
    }

    const { db: targetDb } = initFirebase();
    if (!targetDb) {
      return {
        success: false,
        message: "Could not initialize Firestore instance. Check console for details.",
      };
    }

    try {
      // 1. Seed Profile
      await setDoc(doc(targetDb, "settings", "profile"), personalInfo);

      // 2. Seed Projects
      for (const p of projects) {
        await setDoc(doc(targetDb, "projects", p.id), p);
      }

      // 3. Seed Explorations
      for (const exp of explorations) {
        await setDoc(doc(targetDb, "explorations", exp.id), exp);
      }

      // 4. Seed Tech Stack
      await setDoc(doc(targetDb, "settings", "tech_stack"), { categories: techStack });

      setIsFirebaseConnected(true);
      setActiveSource("firebase");

      return {
        success: true,
        message: `Successfully seeded Firestore with ${projects.length} projects, ${explorations.length} pins, profile info, and tech stack!`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Seed failed: ${err.message || String(err)}`,
      };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        techStack,
        explorations,
        messages,
        isLoading,
        isFirebaseConnected,
        activeSource,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addExploration,
        updateExploration,
        deleteExploration,
        updateTechStack,
        submitContactMessage,
        deleteContactMessage,
        seedFirebase,
        refreshData: async () => {
          await loadFirebaseData();
        },
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
