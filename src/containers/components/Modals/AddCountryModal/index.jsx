import { useState } from "react";
import { saveCountryVisited } from "../../../services/countryService";
import "./style.scss";
import Loading from "../../Loading";

function AddCountryModal({ isOpen, onClose, country, onSave }) {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !country) return null;

  const handleSave = async () => {
    if (!notes.trim()) {
      setError("Escreva algo sobre sua viagem!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const saved = await saveCountryVisited(country.ccn3, notes);
      if (onSave) {
        onSave(country);
      }
      setNotes("")
      onClose();
    } catch {
      setError("Erro ao salvar relato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="modal-info">
      {loading && <Loading />}

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="close-modal" onClick={onClose}>X</div>
          <h2>Você já visitou <b>{country.translations?.por?.common}</b>?</h2>
          <span>Conte-nos como foi a sua experiência!</span>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <textarea
            placeholder="Escreva sobre sua viagem..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            style={{ width: "100%", marginTop: "1rem" }}
          />
          <button onClick={handleSave}>Salvar relato</button>
        </div>
      </div>
    </div>
  );
}

export default AddCountryModal;
