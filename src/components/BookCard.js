function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/128x195";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-32 h-48 object-cover mx-auto rounded"
      />
      <h3 className="text-lg font-semibold mt-2 text-center">{book.title}</h3>
      <p className="text-sm text-gray-600 text-center">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500 text-center">
        First Published: {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}

export default BookCard;
