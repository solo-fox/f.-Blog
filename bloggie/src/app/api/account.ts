import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Result } from "@/types/ResultTypes";
import { AccountTemplate } from "@/types/Templates";

export const createUserDocument = async (name: string, uid: string): Promise<Result> => {
  try {
    const accountData: AccountTemplate = {
      name,
      uid,
      bio: null,
      likes: 0,
      activity: null,
      websiteLink: null,
      facebook: null,
      twitter: null,
      github: null,
      blogs: null,
      likedBlogs: [],
      follow: [],
      followers: []
    };
    await setDoc(doc(db, "users", uid), accountData);
    return {
      message: "Account created successfully",
      success: true,
      error: null,
      payload: null,
    };
  } catch (error) {
    return {
      message: "Failed creating User!",
      success: false,
      error: error.message,
      payload: null,
    };
  }
};

export const updateUserDocument = async (uid: string, data: Partial<AccountTemplate>): Promise<Result> => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, data);
    return {
      message: "User document updated successfully",
      error: null,
      success: true,
      payload: null,
    };
  } catch (error) {
    return {
      message: "Failed to update user document",
      error: error.message,
      success: false,
      payload: null,
    };
  }
};

export const getUserDocument = async (uid: string): Promise<Result> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return {
        message: "Logged in successfully!",
        success: true,
        error: null,
        payload: userDoc.data(),
      };
    } else {
      return {
        message: "Sorry, but try creating an account again!",
        success: false,
        error: null,
        payload: null,
      };
    }
  } catch (error) {
    return {
      message: "Unexpected Error!",
      success: false,
      error: error.message,
      payload: null,
    };
  }
};

export const deleteUserDocument = async (uid: string): Promise<Result> => {
  try {
    await deleteDoc(doc(db, "users", uid));
    return {
      message: "Deleted successfully!",
      success: true,
      error: null,
      payload: null,
    };
  } catch (error) {
    return {
      message: "Unexpected Error!",
      success: false,
      error: error.message,
      payload: null,
    };
  }
};
