function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-100">
      <div
        className="
          w-16
          h-16
          border-4
          border-blue-600
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}

export default Loader;
