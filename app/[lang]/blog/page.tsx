"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { mockBlogPosts } from "@/lib/mockBlogPosts";
import Link from "next/link";
import Image from "next/image";

const POSTS_PER_PAGE = 5;

interface Props {
  params: {
    lang: string;
  };
}

export default function BlogListPage({ params }: Props) {
  const { lang } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page") || "1";
  const page = parseInt(pageParam);

  const paginated = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return mockBlogPosts.slice(start, end);
  }, [page]);

  const totalPages = Math.ceil(mockBlogPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Blog maqolalar</h1>

      <ul className="space-y-6">
        {paginated.map((post) => (
          <li
            key={post.id}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white"
          >
            <Link href={`/${lang}/blog/${post.id}`}>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="object-cover h-full w-full sm:col-span-1"
                  />
                )}
                <div className="p-4 sm:col-span-3">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">{post.title}</h2>
                  <p className="text-gray-700 text-sm mb-3">{post.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="text-blue-600 hover:underline">Batafsil o‘qish →</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border ${
                i + 1 === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"
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
