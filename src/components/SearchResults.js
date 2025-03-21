const SearchResults = ({ results }) => {
  if (!results) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-2">{results.title}</h1>
      
      <div className="mb-6 text-gray-700">
        <p className="text-xl"><span className="font-semibold">Autor:</span> {results.author}</p>
        <p><span className="font-semibold">Rok:</span> {results.year}</p>
        <p><span className="font-semibold">Gatunek:</span> {results.genre}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Wprowadzenie</h2>
        <p className="text-gray-800">{results.introduction}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Streszczenie</h2>
        <div className="prose max-w-none text-gray-800">
          {results.summary.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Analiza</h2>
        <div className="prose max-w-none text-gray-800">
          {results.analysis.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Ocena</h2>
        <p className="text-gray-800 font-medium">{results.rating}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Dla kogo?</h2>
        <p className="text-gray-800">{results.recommendation}</p>
      </div>
    </div>
  );
};

export default SearchResults;
