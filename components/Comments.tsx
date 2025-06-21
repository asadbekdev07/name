"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

interface Comment {
  id: string;
  nameId: string;
  author: string;
  text: string;
  createdAt: any;
}

interface Props {
  nameId: string;
}

export default function Comments({ nameId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameId) {
      console.warn("Comments: nameId is empty!");
      setComments([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("nameId", "==", nameId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setError("Fikrlarni olishda xatolik yuz berdi.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [nameId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!author.trim() || !text.trim()) {
      setError("Iltimos, ismingiz va fikringizni kiriting.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "comments"), {
        nameId,
        author: author.trim(),
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      setAuthor("");
      setText("");
      setLoading(false);
    } catch (err) {
      console.error("Comment submit error:", err);
      setError("Fikr yuborishda xatolik yuz berdi.");
      setLoading(false);
    }
  };

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Fikrlar</h3>

      {loading && comments.length === 0 && (
        <p className="text-gray-500">Yuklanmoqda...</p>
      )}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Ismingiz"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
          required
        />
        <textarea
          placeholder="Fikringiz"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border rounded resize-y"
          rows={3}
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Yuborish
        </button>
      </form>

      <div className="space-y-4">
        {!loading && comments.length === 0 && (
          <p className="text-gray-500">Hozircha fikrlar yo‘q.</p>
        )}

        {comments.map(({ id, author, text, createdAt }) => (
          <div
            key={id}
            className="border border-gray-300 rounded p-4 bg-white shadow-sm"
          >
            <p className="font-semibold">{author}</p>
            <p className="mt-1 whitespace-pre-wrap">{text}</p>
            <p className="text-xs text-gray-400 mt-2">
              {createdAt && createdAt.toDate
                ? createdAt.toDate().toLocaleString()
                : "Yaqinda"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
