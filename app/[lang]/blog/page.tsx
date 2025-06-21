"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";

const POSTS_PER_PAGE = 5;

interface Props {
  params: {
    lang: string;
  };
}

export default function BlogListPage({ params }: Props) {
  const { lang } = useParams() as { lang: string };
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page") || "1";
  const page = parseInt(pageParam);

  const [allPosts, setAllPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const ref = collection(db, "blogs");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Blog),
        }));

        setAllPosts(blogs);
      } catch (error) {
        console.error("❌ Bloglarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const paginated = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return allPosts.slice(start, end);
  }, [page, allPosts]);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Blog maqolalar</h1>

      {loading ? (
        <p className="text-center text-gray-500">Yuklanmoqda...</p>
      ) : paginated.length === 0 ? (
        <p className="text-red-600 text-center">
          Hozircha bloglar mavjud emas.
        </p>
      ) : (
        <ul className="space-y-6">
          {paginated.map((post) => (
            <li
              key={post.id}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white"
            >
              <Link href={`/${lang}/blog/${post.slug}`}>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {post.imageUrl && (
                    <img
  src="https://via.placeholder.com/800x400.png?text=Hello"
  alt="Test image"
  className="rounded-lg w-full h-auto object-cover"
/>
                  )}
                  <div className="p-4 sm:col-span-3">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm mb-3">
                      {/* HTML bo‘lishi mumkinligi uchun faqat matn ajratamiz */}
                      {post.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {post.createdAt?.toDate().toLocaleDateString("uz-UZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-blue-600 hover:underline">
                        Batafsil o‘qish →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border ${
                i + 1 === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
