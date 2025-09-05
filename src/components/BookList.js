import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  if (books.length === 0) {
    return <p className="text-center">No books found. Try searching!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

export default BookList;
