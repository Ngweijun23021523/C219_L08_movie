import { useEffect, useState } from "react";
const KEY = "663fcc9b";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  useEffect(() => {
    const controller = new AbortController();
    // Effect
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => data.Response === "True" && setMovies(data.Search))
      .catch((err) => console.log(err));
      return () => {
        controller.abort();
      }
  }, [query]);

  

  return (
    <div>
      <h1>Movies</h1>
      <input
        value={query}
        type="text"
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
