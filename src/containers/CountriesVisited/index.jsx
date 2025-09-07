import { useState, useEffect } from "react";
import { getVisitedCountries } from "../services/countryService";
import InfoCountryModal from "../components/Modals/InfoCountryModal";
import "./style.scss";
import Loading from "../components/Loading";

function VisitedCountries() {
  const [countriesVisited, setCountriesVisited] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCountriesVisited = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVisitedCountries();
      setCountriesVisited(data);
    } catch {
      setError("Não foi possível buscar países visitados!");
      setCountriesVisited([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountriesVisited();
  }, []);

  const handleDeleteCountry = (ccn3) => {
    setCountriesVisited((prev) => prev.filter((c) => c.ccn3 !== ccn3));
  };

  const openModal = (country) => {
    setSelectedCountry(country);
    setIsInfoModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setIsInfoModalOpen(false);
  };

  return (
    <section id="VisitedCountries">
      <div className="section">
        <div className="menu">
          <a href="/">Voltar pro inicio</a>
          <h2>Países que você já visitou</h2>
        </div>

        {loading && <Loading />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {countriesVisited.length > 0 ? (
          <div className="list">
            {countriesVisited.map((country) => (
                <div className="item" key={country.ccn3}>
                <div className="img">
                  <img
                    src={country.flags.png}
                    alt={country.translations?.por?.official}
                  />
                  <span>Você já esteve aqui</span>
                </div>
                <ul className="info">
                  <li>
                    <span className="title">
                      {country.translations?.por?.common}
                    </span>
                    <span className="subtitle">
                      <b>Capital:</b> {country.capital}
                    </span>
                  </li>
                  <li>
                    <b>Continente:</b> {country.region} / {country.subregion}
                  </li>
                  <li>
                    <b>População:</b> {country.population.toLocaleString()}
                  </li>
                  <li>
                    <a href={country.maps.googleMaps} target="_blank">
                      Ver no mapa
                    </a>
                  </li>
                  <button onClick={() => openModal(country)}>
                    Ver meu relato
                  </button>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>Você ainda não adicionou nenhum país visitado.</p>
        )}
      </div>

      <InfoCountryModal
        isOpen={isInfoModalOpen}
        onClose={closeModal}
        country={selectedCountry}
        onDelete={handleDeleteCountry}
      />
    </section>
  );
}

export default VisitedCountries;
