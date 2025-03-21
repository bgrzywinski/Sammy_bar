const LoadingAnimation = () => {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xl font-medium text-gray-700 mb-2">Szukam dla Ciebie...</p>
          <p className="text-gray-500 italic">Przeglądanie źródeł i generowanie odpowiedzi</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  };
  
  export default LoadingAnimation;