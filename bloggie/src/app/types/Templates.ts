
// Represents a blog post with related information.
 interface BlogTemplate {
  uid: string;
  photoURL: string;
  title: string;            // Title of the blog post
  author: string;           // Author of the blog post
  content: string;        // Main content of the blog post
  likes: number;
  views: number;
  id: string;
  keywords: string[];
  cover: string;
  description: string;
  date:string;
}

// Represents a user account with personal details and blogs.
export interface AccountTemplate {
  name: string;             // Name of the user   // Email of the user
  bio: string | null ;      // Biography of the user, can be null
  likes: number;
  uid: string;
  likedBlogs: string[];
  follow: string[];
  followers: string[];
  activity: string[] | null;
  websiteLink: string | null; // Personal website link, can be null
  facebook: string | null;  // Facebook profile link, can be null
  twitter: string | null;   // Twitter profile link, can be null
  github: string | null;    // GitHub profile link, can be null
  blogs: string[] | null ;// refrence to anthor document
}
