import { useState } from "react";
import BookModal from "./components/BookModal";


function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Modal state
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch books (search + pagination)
  const fetchBooks = async (reset = false) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}&page=${page}`
      );
      const data = await res.json();

      if (data.docs.length === 0 && reset) {
        setError("No books found. Try a different title.");
        setBooks([]);
        setHasMore(false);
      } else {
        setBooks((prev) => (reset ? data.docs : [...prev, ...data.docs]));
        setHasMore(data.start + data.docs.length < data.numFound);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const searchBooks = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks(true);
  };

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1);
    fetchBooks(false);
  };

  // Fetch details for modal
  const fetchBookDetails = async (workKey) => {
    setDetailsLoading(true);
    setBookDetails(null);

    try {
      const res = await fetch(`https://openlibrary.org${workKey}.json`);
      const data = await res.json();
      setBookDetails(data);
    } catch (err) {
      setBookDetails({ description: "Details not available." });
    }

    setDetailsLoading(false);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    fetchBookDetails(book.key); // use the work key (e.g. "/works/OL82563W")
  };

  const closeModal = () => {
    setSelectedBook(null);
    setBookDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📚 Book Finder
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={searchBooks}
        className="flex justify-center mb-6 gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="w-1/2 p-2 border rounded-lg shadow"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {books.map((book, index) => {
          const coverId = book.cover_i;
          const coverImg = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/150";

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center cursor-pointer hover:scale-105 transition"
              onClick={() => openModal(book)}
            >
              <img
                src={coverImg}
                alt={book.title}
                className="h-48 w-auto mb-3 rounded"
              />
              <h3 className="font-semibold text-center text-sm">
                {book.title}
              </h3>
              <p className="text-gray-600 text-xs">
                {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreBooks}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {detailsLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-4">
                  {selectedBook.author_name
                    ? selectedBook.author_name.join(", ")
                    : "Unknown Author"}
                </p>
                {bookDetails && (
                  <>
                    <p className="mb-3">
                      {bookDetails.description?.value ||
                        bookDetails.description ||
                        "No description available."}
                    </p>
                    {bookDetails.subjects && (
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Subjects:</strong> {bookDetails.subjects.slice(0, 8).join(", ")}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
