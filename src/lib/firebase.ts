import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_KEY = "onesaksham_firebase_config";

/**
 * Saksham's Official Firebase Project Configuration
 */
export const DEFAULT_FIREBASE_CONFIG: FirebaseConfigObject = {
  apiKey: "AIzaSyDt-oSreiUGcHnuIiHHVfk26jV4fr1SC0o",
  authDomain: "onesaksham-c0259.firebaseapp.com",
  projectId: "onesaksham-c0259",
  storageBucket: "onesaksham-c0259.firebasestorage.app",
  messagingSenderId: "287641057443",
  appId: "1:287641057443:web:6dafff60834ae442b9a716",
  measurementId: "G-ED498EH8MJ",
};

/**
 * Returns active Firebase config from either localStorage, import.meta.env, or default config
 */
export function getActiveFirebaseConfig(): FirebaseConfigObject {
  // 1. Check user override in localStorage
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.apiKey && parsed?.projectId) {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  // 2. Check Vite environment variables
  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (envApiKey && envProjectId) {
    return {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${envProjectId}.firebaseapp.com`,
      projectId: envProjectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${envProjectId}.firebasestorage.app`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
    };
  }

  // 3. Fallback to Saksham's official Firebase project
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveFirebaseConfig(config: FirebaseConfigObject): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch {
    return false;
  }
}

export function clearFirebaseConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function initFirebase() {
  const config = getActiveFirebaseConfig();

  try {
    const existingApps = getApps();
    app = existingApps.length > 0 ? existingApps[0] : initializeApp(config);
    db = getFirestore(app);
    auth = getAuth(app);
    return { app, db, auth, isConfigured: true };
  } catch (err) {
    console.warn("Failed to initialize Firebase:", err);
    return { app: null, db: null, auth: null, isConfigured: false, error: err };
  }
}

// Initial attempt
const initial = initFirebase();
app = initial.app;
db = initial.db;
auth = initial.auth;

export { app, db, auth };
