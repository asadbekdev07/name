// lib/firestoreHelpers.ts
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

/**
 * Sahifa ochilganda ko‘rishlar sonini oshirish
 */
export async function incrementView(name: string) {
  const ref = doc(db, "names", name.toLowerCase());
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { views: 1, likes: 0 });
  } else {
    await updateDoc(ref, { views: increment(1) });
  }
}

/**
 * Like bosilganda ishlaydi
 */
export async function toggleLike(name: string, liked: boolean) {
  const ref = doc(db, "names", name.toLowerCase());
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { views: 0, likes: liked ? 1 : 0 });
  } else {
    await updateDoc(ref, {
      likes: increment(liked ? 1 : -1),
    });
  }
}

/**
 * Ismga oid statistikani olish
 */
export async function getNameStats(name: string) {
  const ref = doc(db, "names", name.toLowerCase());
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  return { likes: 0, views: 0 };
}
