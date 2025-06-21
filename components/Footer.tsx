import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-base font-semibold mb-2 text-gray-800">
              Ismlar Ma’nosi
            </h2>
            <p className="text-sm">
              Farzandingiz uchun eng chiroyli va mazmunli ismlarni toping.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Havolalar</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/uz">
                  <span className="hover:underline">Bosh sahifa</span>
                </Link>
              </li>
              <li>
                <Link href="/uz/categories">
                  <span className="hover:underline">Turkumlar</span>
                </Link>
              </li>
              <li>
                <Link href="/uz/popular/male">
                  <span className="hover:underline">Erkaklar</span>
                </Link>
              </li>
              <li>
                <Link href="/uz/popular/female">
                  <span className="hover:underline">Ayollar</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Bog‘lanish</h3>
            <p>
              Email:{" "}
              <a href="mailto:info@ismlar.uz" className="underline">
                info@ismlar.uz
              </a>
            </p>
            <p>
              Telegram:{" "}
              <a
                href="https://t.me/ism_bot"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ism_bot
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Ismlar.uz. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
