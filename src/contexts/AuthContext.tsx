import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "student" | "teacher" | "pathguider" | null;
  coins?: number;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: "student" | "teacher" | "pathguider") => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserData(user: User) {
    if (!user) return null;
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as Omit<UserData, "uid">;
        return { uid: user.uid, ...userData };
      } else {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: null,
          coins: 0
        };
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  async function signup(email: string, password: string, role: "student" | "teacher" | "pathguider"): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName || email.split('@')[0],
        role: role,
        coins: 100,
        createdAt: new Date().toISOString()
      });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in",
        description: "You have been logged in successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  }

  async function googleSignIn(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          displayName: result.user.displayName,
          role: null,
          coins: 100,
          createdAt: new Date().toISOString()
        });
        
        toast({
          title: "Account created",
          description: "Please select your role to continue",
        });
        
        window.location.href = "/role-selection";
      } else {
        toast({
          title: "Logged in",
          description: "You have been logged in successfully!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const data = await fetchUserData(user);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    signup,
    logout,
    googleSignIn,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
