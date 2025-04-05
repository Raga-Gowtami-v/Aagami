
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  DocumentData,
  Query
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

// Generic functions to interact with Firestore

// Add document to collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Get document by ID
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Update document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete document
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Query collection
export const queryCollection = async (
  collectionName: string, 
  conditions: { field: string, operator: any, value: any }[] = [],
  sortBy?: { field: string, direction: 'asc' | 'desc' },
  limitTo?: number
) => {
  try {
    let collectionRef = collection(db, collectionName);
    // Initialize with basic query on the collection
    let q: Query<DocumentData> = query(collectionRef);
    
    // Apply where conditions
    if (conditions.length > 0) {
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
    }
    
    // Apply ordering
    if (sortBy) {
      q = query(q, orderBy(sortBy.field, sortBy.direction));
    }
    
    // Apply limit
    if (limitTo) {
      q = query(q, limit(limitTo));
    }
    
    const querySnapshot = await getDocs(q);
    const results: DocumentData[] = [];
    
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    return results;
  } catch (error) {
    console.error("Error querying collection:", error);
    throw error;
  }
};

// Upload file to Firebase Storage
export const uploadFile = async (
  file: File, 
  path: string = 'uploads'
): Promise<string> => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}-${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Specific function to update user coins
export const updateUserCoins = async (userId: string, coinsChange: number) => {
  try {
    // Get current user data
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentCoins = userData.coins || 0;
      const newCoins = currentCoins + coinsChange;
      
      // Update coins
      await updateDoc(userRef, {
        coins: newCoins,
        updatedAt: serverTimestamp()
      });
      
      // Add transaction record
      await addDoc(collection(db, "coinTransactions"), {
        userId,
        amount: coinsChange,
        balance: newCoins,
        description: coinsChange > 0 ? "Coins earned" : "Coins spent",
        createdAt: serverTimestamp()
      });
      
      return newCoins;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error updating user coins:", error);
    throw error;
  }
};
