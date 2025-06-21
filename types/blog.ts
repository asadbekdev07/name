export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt: any; // Firestore Timestamp
};
