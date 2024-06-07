import { doc, setDoc, getDocs, getDoc, collection, updateDoc} from "firebase/firestore";
import { updateUserDocument } from "@/db/account";
import { db } from "@/firebase";
import { searchEngine } from "@/typesense";
import { Result } from "@/types/ResultTypes";
import { BlogTemplate } from "@/types/Templates";
import moment from "moment";

export const createBlog = async (uid: string, photo: string, title: string, author: string, content: string, keywords: string[], description: string, cover: string): Promise<Result> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      let userData = userDoc.data();
      let blogs = userData.blogs || []; // Initialize blogs array if not present
      let activity = userData.activity || []; // Initialize activity array if not present

      const blogsRef = doc(collection(db, "blogs"));
      blogs.push(blogsRef.id);

      const todayDate = moment().format("YYYY-MM-DD");
      if (!activity.includes(todayDate)) {
        activity.push(todayDate);
      }

      const blogData: BlogTemplate = {
        uid,
        title,
        author,
        content,
        likes: 0,
        views: 0,
        id: blogsRef.id,
        description,
        cover,
        photoURL: photo,
        keywords,
        date: moment().format("YYYY-MM-DD")
      };
      await setDoc(blogsRef, blogData);
      await updateUserDocument(uid, { blogs, activity });
      const createIndexDocument = searchEngine.collections('blogs').documents().create({
        id: blogsRef.id,
        title,
        author,
        content,
        date: moment().format("YYYY-MM-DD"),
        keywords,
        description
      })
      return {
        message: "Blog created successfully!",
        success: true,
        error: null,
        payload: userData,
      };
    } else {
      return {
        message: "Sorry, User was not found!",
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

export const updateBlog = async (id:string, data:Partial<BlogTemplate>): Promise<Result> => {
  try {
    const blogDocRef = doc(db, "blogs", id);
    await updateDoc(blogDocRef, data);
    return {
      message: "Updated successfully",
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

export const getBlogById = async (id: string): Promise<Result> => {
  try {
    const blogDoc = await getDoc(doc(db, "blogs", id));
    if (blogDoc.exists()) {
      return {
        message: "",
        success: true,
        error: null,
        payload: blogDoc.data(),
      };
    } else {
      return {
        message: "Cannot get blog data!",
        success: false,
        error: null,
        payload: null,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Unexpected Error!",
      success: false,
      error: error.message,
      payload: null,
    };
  }
};

export const getBlogs = async (): Promise<Result> => {
  try {
    const blogDoc = await getDocs(collection(db, "blogs"));
    return  {
      message: "",
      success: true,
      error: null,
      payload: blogDoc
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
