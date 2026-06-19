import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [summary, setSummary] = useState(null);

  useEffect(() => {
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

    fetchDashboard();
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

  if (!dashboard) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

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

          {dashboard.borrowId && (
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Active Borrow</h2>

              <p className="text-gray-600 mb-4">
                You currently have an active borrowed book.
              </p>

              <button
                onClick={fetchSummary}
                className="
    bg-red-600
    text-white
    px-6
    py-3
    rounded-lg
  "
              >
                Return Book
              </button>
            </div>
          )}
        </div>
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
              flex-1
              bg-gray-300
              py-2
              rounded
            "
              >
                Cancel
              </button>

              <button
                onClick={returnBook}
                className="
              flex-1
              bg-green-600
              text-white
              py-2
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
