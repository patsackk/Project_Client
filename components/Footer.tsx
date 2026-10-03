export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-center">
      <p className="text-gray-400">
        &copy; {new Date().getFullYear()} UTO Advance Engineering. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6">
        <a
          href="https://www.instagram.com/uto_advance_engineering/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition hover:text-sky-400"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
