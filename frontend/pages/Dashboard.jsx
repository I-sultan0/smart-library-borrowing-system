import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/borrow/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchHistory();
  }, []);

  const returnBook = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/borrow/${dashboard.borrowId}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Payment Successful. Book Returned.");

      setShowModal(false);

      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/borrow/${dashboard.borrowId}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data.data);

      setShowModal(true);
    } catch (error) {
      toast.error(error);
    }
  };

  if (!dashboard) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      {dashboard.borrowId && (
        <div className="bg-slate-100 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Active Borrow</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Current Book */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm mb-2">Current Book</h3>

                <p className="text-xl font-bold">{dashboard.activeBook}</p>
              </div>

              {/* Amount Due */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm mb-2">Amount Due</h3>

                <p className="text-xl font-bold">₹{dashboard.amountDue}</p>
              </div>

              {/* History Count */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm mb-2">History Count</h3>

                <p className="text-xl font-bold">{dashboard.historyCount}</p>
              </div>

              {/* Due Date */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-gray-500 text-sm mb-2">Due Date</h3>

                <p className="text-xl font-bold">
                  {dashboard.dueDate
                    ? new Date(dashboard.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={fetchSummary}
                className="
      bg-red-600
      text-white
      px-6
      py-3
      cursor-pointer
      rounded-lg
      hover:bg-red-700
      transition
    "
              >
                Return Book
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 mb-10">
        <div className="flex items-center justify-between mb-5 p-8">
          <h2 className="text-3xl font-bold">Borrow History</h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            {history.length} Records
          </span>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <h3 className="text-xl font-semibold mb-2">No Borrow History</h3>

            <p className="text-gray-500">Returned books will appear here.</p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-2xl shadow-lg p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 text-left">Book</th>

                    <th className="px-6 py-4 text-left">Borrowed</th>

                    <th className="px-6 py-4 text-left">Returned</th>

                    <th className="px-6 py-4 text-left">Cost</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr
                      key={item._id}
                      className="
                border-b
                hover:bg-slate-50
                transition
              "
                    >
                      <td className="px-6 py-4 font-medium">
                        {item.bookId.title}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(item.borrowDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(item.returnDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    font-semibold
                  "
                        >
                          ₹{item.totalCost}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && summary && (
        <div
          className="
        fixed
        inset-0
        bg-black/50
        flex
        justify-center
        items-center
      "
        >
          <div
            className="
          bg-white
          rounded-xl
          p-6
          w-[400]
        "
          >
            <h2 className="text-2xl font-bold mb-4">Return Summary</h2>

            <p>
              <strong>Book:</strong> {summary.bookTitle}
            </p>

            <p>
              <strong>Borrow Date:</strong>{" "}
              {new Date(summary.borrowDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Return Date:</strong>{" "}
              {new Date(summary.returnDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Days:</strong> {summary.borrowedDays}
            </p>

            <p className="text-xl font-bold mt-4">
              Total Due: ₹{summary.totalCost}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="
               p-2
              bg-gray-300
              rounded
              cursor-pointer
            "
              >
                Cancel
              </button>

              <button
                onClick={returnBook}
                className="
              bg-green-600
              text-white
              p-2
              cursor-pointer
              rounded
            "
              >
                Pay & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
