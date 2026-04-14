import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12&fields=key,title,author_name,cover_i,first_publish_year`
      );
      setResults(response.data.docs);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper font-body">

      {/* Navbar */}
      <nav className="bg-rose-light border-b border-section px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl text-ink-dark">Quill Quest</h1>
        <div className="flex items-center gap-4">
          <span className="text-ink-secondary text-sm">Hey, {user?.username}!</span>
          <button
            onClick={handleLogout}
            className="bg-rose hover:bg-rose-light hover:text-ink text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Search heading */}
        <h2 className="font-heading text-3xl text-ink-dark text-center mb-2">
          Find Your Next Read
        </h2>
        <p className="text-ink-secondary text-center mb-8">
          Search for a book and test your knowledge with a quiz
        </p>

        {/* Search bar */}
        <div className="flex gap-3 mb-10">
          <input
            className="flex-1 px-4 py-3 rounded-lg border border-section bg-card text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-brown"
            placeholder="Search for a book... e.g. Atomic Habits"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-rose hover:bg-rose-light hover:text-ink text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-ink-secondary">Searching...</p>
        )}

        {/* No results */}
        {searched && !loading && results.length === 0 && (
          <p className="text-center text-ink-secondary">No books found. Try a different search!</p>
        )}

        {/* Results grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map((book) => (
            <div
              key={book.key}
              onClick={() => navigate(`/book/${book.key.replace("/works/", "")}`)}
              className="bg-card border border-section rounded-xl p-3 cursor-pointer hover:shadow-md hover:border-brown transition-all duration-200"
            >
              {/* Cover image */}
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-section rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-ink-secondary text-xs text-center px-2">No cover available</span>
                </div>
              )}

              {/* Book info */}
              <p className="text-ink font-bold text-sm leading-tight mb-1 line-clamp-2">{book.title}</p>
              <p className="text-ink-secondary text-xs line-clamp-1">
                {book.author_name?.[0] || "Unknown author"}
              </p>
              {book.first_publish_year && (
                <p className="text-ink-secondary text-xs mt-1">{book.first_publish_year}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}