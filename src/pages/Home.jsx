const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Global Express
        </h1>
        <p className="text-gray-600 mb-6">
          Your React app with Tailwind CSS is ready!
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Folder Structure
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>📁 src/api - API configuration & services</li>
              <li>📁 src/contexts - React contexts</li>
              <li>📁 src/components - Reusable components</li>
              <li>📁 src/pages - Page components</li>
              <li>📁 src/hooks - Custom hooks</li>
              <li>📁 src/utils - Utility functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
