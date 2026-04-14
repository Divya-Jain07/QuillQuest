import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
        const data = response.data;

        // Description can be a string or an object with a value property
        const description =
          typeof data.description === "string"
            ? data.description
            : data.description?.value || "No description available.";

        setBook({
          title: data.title,
          description,
          coverId: data.covers?.[0],
          subjects: data.subjects?.slice(0, 5) || [],
        });
      } catch (err) {
        console.error("Failed to fetch book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center font-body">
        <p className="text-ink-secondary">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center font-body">
        <p className="text-ink-secondary">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper font-body">

      {/* Navbar */}
      <nav className="bg-rose-light border-b border-section px-6 py-4 flex items-center justify-between">
        <h1
          className="font-heading text-2xl text-ink-dark cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Quill Quest
        </h1>
        <button
          onClick={() => navigate("/home")}
          className="text-ink-secondary text-sm hover:text-rose transition-colors"
        >
          ← Back to search
        </button>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-card border border-section rounded-2xl p-8 flex flex-col sm:flex-row gap-8">

          {/* Cover */}
          <div className="flex-shrink-0">
            {book.coverId ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                alt={book.title}
                className="w-40 rounded-xl shadow-sm"
              />
            ) : (
              <div className="w-40 h-56 bg-section rounded-xl flex items-center justify-center">
                <span className="text-ink-secondary text-xs text-center px-3">No cover</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="font-heading text-3xl text-ink-dark mb-3">{book.title}</h2>

            {book.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {book.subjects.map((subject, i) => (
                  <span
                    key={i}
                    className="bg-rose-light text-ink text-xs px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}

            <p className="text-ink-secondary text-sm leading-relaxed mb-6 line-clamp-6">
              {book.description}
            </p>

            <button
              onClick={() => navigate(`/quiz/${id}`)}
              className="bg-rose hover:bg-rose-light hover:text-ink text-white font-bold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Take the Quiz
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}