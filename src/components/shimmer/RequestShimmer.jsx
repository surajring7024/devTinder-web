const RequestShimmer = () => {
  return (
    <div className="flex justify-center w-full">
      <ul className="list bg-base-200 rounded-box shadow-md w-1/3">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Requests</li>

        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx} className="list-row animate-pulse space-x-4">
            <div className="rounded-full bg-gray-600 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="h-10 w-10 bg-gray-600 rounded-lg"></div>
            <div className="h-10 w-10 bg-gray-600 rounded-lg"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestShimmer;
