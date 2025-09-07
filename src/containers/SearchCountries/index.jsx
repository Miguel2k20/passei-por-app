import { useState, useEffect, useMemo } from "react";
import { getCountries, getVisitedCountries } from "../services/countryService";
import InfoCountryModal from "../components/Modals/InfoCountryModal";
import AddCountryModal from "../components/Modals/AddCountryModal";
import "./style.scss";
import Loading from "../components/Loading";

function SearchCountries() {
  const [search, setSearch] = useState(""); 
  const [countries, setCountries] = useState([]);
  const [countriesVisited, setCountriesVisited] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCountries = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCountries(query);
      setCountries(data);
    } catch {
      setError("Não encontrado países com esse nome!");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesVisited = async () => {
    try {
      const data = await getVisitedCountries();
      setCountriesVisited(data);
    } catch {
      setError("Não foi possível buscar países visitados!");
      setCountriesVisited([]);
    }
  };

  const handleDeleteCountry = (ccn3) => {
    setCountriesVisited((prev) => prev.filter((c) => c.ccn3 !== ccn3));
  };

  const handleAddCountry = (country) => {
    setCountriesVisited((prev) => [...prev, country]);
  };

  const countriesWithVisited = useMemo(() => {
    const visitedSet = new Set(countriesVisited.map(c => c.ccn3));
    return countries.map(country => ({
      ...country,
      visited: visitedSet.has(country.ccn3)
    }));
  }, [countries, countriesVisited]);

  useEffect(() => {
    fetchCountries("");
    fetchCountriesVisited();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCountries(search.trim());
  };

  const openModal = (country) => {
    setSelectedCountry(country);
    if (country.visited) {
      setIsInfoModalOpen(true);
    } else {
      setIsAddModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setIsInfoModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <section id="SearchCountries">
      <div className="section">
        <div className="menu">
          <a href="/">Voltar pro inicio</a>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="name"
              placeholder="Buscar pelo país"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
          </form>
        </div>

        {loading && <Loading />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {countriesWithVisited.length > 0 && (
          <div className="list">
            {countriesWithVisited.map((country) => (
              <div className="item" key={country.ccn3}>
                <div className="img">
                  <img
                    src={country.flags.png}
                    alt={country.translations?.por?.official}
                  />
                  {country.visited && <span>Você já esteve aqui</span>}
                </div>
                <ul className="info">
                  <li>
                    <span className="title">
                      {country.translations?.por?.common }
                    </span>
                    <span className="subtitle">
                      <b>Capital:</b> {country.capital}
                    </span>
                  </li>
                  <li>
                    <b>Continente:</b> {country.region} / {country.subregion}</li>
                  <li>
                    <b>População:</b> {country.population.toLocaleString()}</li>
                  <li>
                    <a href={country.maps.googleMaps} target="_blank">Ver no mapa</a>
                  </li>
                  <button onClick={() => openModal(country)}>
                    {country.visited ? "Ver meu relato" : "Já Passei por aqui!"}
                  </button>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <InfoCountryModal
        isOpen={isInfoModalOpen}
        onClose={closeModal}
        country={selectedCountry}
        onDelete={handleDeleteCountry}
      />

      <AddCountryModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        country={selectedCountry}
        onSave={handleAddCountry}
      />
    </section>
  );
}

export default SearchCountries;
