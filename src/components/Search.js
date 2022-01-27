import React, { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const responce = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(responce.data);
    };

    loadCountries();
  }, []);

  //   console.log(countries);

  const searchCountries = (text) => {
    if (!text) {
      setCountryMatch([]);
    } else {
      let matches = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(text.toLowerCase());
        // const regex = new RegExp(`${text}`, "gi");
        // return country.name.common.match(regex);
      });
      setCountryMatch(matches);
    }
  };

  console.log(countryMatch);

  return (
    <div>
      <input
        placeholder="enter country"
        onChange={(e) => searchCountries(e.target.value)}
      />
      {countryMatch.map((item, i) => (
        <div key={i}>
          <h5>
            {item.name.common}
            <img width={30} height={20} src={item.flags.svg} />
          </h5>
        </div>
      ))}
    </div>
  );
}

export default Search;
