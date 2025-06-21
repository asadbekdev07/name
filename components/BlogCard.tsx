import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";

type Props = {
  blog: Blog;
  lang: string;
};

export default function BlogCard({ blog, lang }: Props) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition">
      <Link href={`/${lang}/blog/${blog?.slug || blog.id}`}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {blog?.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          )}
          <div className="p-4 sm:col-span-3">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              {blog.title}
            </h2>

            <p className="text-gray-700 text-sm mb-3">
              {blog.content?.slice(0, 100)}...
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {blog.createdAt?.toDate?.().toLocaleDateString("uz-UZ", {
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
    </div>
  );
}
