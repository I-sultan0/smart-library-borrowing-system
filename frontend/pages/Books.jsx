import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 8;
  const lastBookIndex = currentPage * booksPerPage;
  const firstBookIndex = lastBookIndex - booksPerPage;
  const currentBooks = books.slice(firstBookIndex, lastBookIndex);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");

      setBooks(response.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const borrowBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      await api.post(
        "/borrow",
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Book Borrowed Successfully");
      // window.location.reload();
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Library Books</h1>

            <div className="bg-white px-4 py-2 rounded-lg shadow">
              Total Books: {books.length}
            </div>
          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
          >
            {currentBooks.map((book) => (
              <div
                key={book._id}
                className="
                bg-white
                rounded-xl
                shadow-md
                hover:shadow-xl
                transition
                p-5
                flex
                flex-col
                justify-between
              "
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>

                  <p className="text-gray-600 mb-4">{book.author}</p>

                  <div className="space-y-2">
                    <p className="font-medium">
                      Price:
                      <span className="ml-2 text-blue-600">
                        ₹{book.pricePerDay}/day
                      </span>
                    </p>

                    <p>
                      Status:
                      <span
                        className={`ml-2 font-semibold ${
                          book.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {book.available ? "Available" : "Unavailable"}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => borrowBook(book._id)}
                  disabled={!book.available}
                  className="
                  mt-6
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3
                  rounded-lg
                  font-semibold
                  transition
                  cursor-pointer
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                "
                >
                  {book.available ? "Borrow Book" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="
      px-4
      py-2
      bg-white
      border
      rounded-lg
      disabled:opacity-50
            cursor-pointer

    "
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="
      px-4
      py-2
      bg-white
      border
      rounded-lg
      disabled:opacity-50
      cursor-pointer
    "
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Books;
