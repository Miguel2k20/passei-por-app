import { useState, useEffect } from "react";
import { getVisitedCountryByCode, deleteCountryVisited, updateCountryVisited } from "../../../services/countryService";
import "./style.scss";
import Loading from "../../Loading";

function InfoCountryModal({ isOpen, onClose, country, onUpdate, onDelete }) {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen && country) {
      const fetchCountry = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getVisitedCountryByCode(country.ccn3);
          setCountryData(data);
          setNotes(data.notes || "");
        } catch {
          setError("Erro ao carregar relato do país.");
        } finally {
          setLoading(false);
        }
      };

      fetchCountry();
    }
  }, [isOpen, country]);

  const handleDelete = async () => {
    if (!countryData?.id) {
      setError("Não foi possível identificar o país para exclusão.");
      return;
    }
    try {
      setLoading(true);
      await deleteCountryVisited(countryData.id);
      if (onDelete) onDelete(countryData.ccn3);
      onClose();
    } catch {
      setError("Erro ao apagar país visitado.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!notes.trim()) {
      setError("Relato obrigatório");
      return;
    }
    try {
      setLoading(true);
      await updateCountryVisited(countryData.id, notes);
      if (onUpdate) onUpdate({ ...countryData, notes });
      onClose();
    } catch {
      setError("Erro ao salvar relato do país.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="modal-info">
      {loading && <Loading />}

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>

          <div className="close-modal" onClick={onClose}>X</div>

          {countryData ? (
            <>
              <h2>{countryData.infoCountry.name.common}</h2>
              <p><b>Capital:</b> {countryData.infoCountry.capital}</p>
              <p><b>Continente:</b> {countryData.infoCountry.region} / {countryData.infoCountry.subregion}</p>
              <p><b>População:</b> {countryData.infoCountry.population.toLocaleString()}</p>
          
              {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escreva seu relato sobre a viagem..."
                rows={5}
              />

              <div className="modal-actions">
                <button onClick={handleSave} className="save-btn">Atualizar o relato</button>
                <button onClick={handleDelete} className="delete-btn">Deletar Relato</button>
              </div>
            </>
          ) : (
            !loading && <p>Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoCountryModal;
