import axios from "axios";
import React, { useEffect, useState } from "react";

function HomeLayout() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films/?format=json")
      .then((data) => setMovies(data.data.results));
  }, []);

  const filteredFilms = movies.filter((film) => {
    return film.title.toLowerCase().includes(filter.toLowerCase());
  });
  function convertToRomanNumeral(episodeNumber) {
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let romanNumeral = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (episodeNumber >= romanNumerals[i].value) {
        romanNumeral += romanNumerals[i].numeral;
        episodeNumber -= romanNumerals[i].value;
      }
    }
    return romanNumeral;
  }

  function handleOnclick(item) {
    setSelectedMovie((prevState) => {
      return [...prevState, item];
    });
  }
  console.log("@SN ", selectedMovie);
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by...
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Episodes
            </a>
            <a className="dropdown-item" href="#">
              Year
            </a>
          </div>
        </div>
        <input
          value={filter}
          type="text"
          className="form-control"
          placeholder="Type to search..."
          aria-label="Text input with dropdown button"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table class="table" style={{ width: "50%" }}>
        <tbody>
          {filteredFilms.map((item, index) => {
            return (
              <tr key={index}>
                <td>EPISODE {item.episode_id}</td>
                <td onClick={() => handleOnclick(item)}>
                  Episode {convertToRomanNumeral(item.episode_id)} -{" "}
                  {item.title}
                </td>
                <td>{item.release_date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedMovie.map((item) => {
        return <p>{item.title}</p>;
      })}
    </div>
  );
}

export default HomeLayout;
