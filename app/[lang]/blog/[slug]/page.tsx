"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailedPage() {
  const { lang, slug } = useParams() as { lang: string; slug: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const ref = doc(db, "blogs", slug);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setBlog({ id: snap.id, ...(snap.data() as Blog) });
        } else {
          console.warn("Blog not found");
        }
      } catch (error) {
        console.error("❌ Blogni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
  }

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-xl text-red-600 font-semibold">Blog topilmadi</h1>
        <Link href={`/${lang}/blog`} className="text-blue-600 underline mt-4 inline-block">
          ← Boshqa bloglar
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{blog.title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        Muallif: {blog.author || "Noma'lum"} •{" "}
        {blog.createdAt?.toDate().toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {blog.image && (
        <div className="mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      )}

      <article className="prose max-w-none text-gray-800">
        {blog.content}
      </article>
    </main>
  );
}