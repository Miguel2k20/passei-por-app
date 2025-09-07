import { api } from "./api";

export const getCountries = async (query) => {
  try {
    const response = await api.get("/country", {
      params: { country: query },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    throw error;
  }
};

export const getVisitedCountries = async () => {
  try {
    const response = await api.get("/country-visited");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar países visitados:", error);
    throw error;
  }
}

export const getVisitedCountryByCode = async (ccn3) => {
  try {
    const response = await api.get(`/country-visited/${ccn3}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar país visitado:", error);
    throw error;
  }
};

export const deleteCountryVisited = async (id) => {
  try {
    const response = await api.delete(`/country/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar país visitado:", error);
    throw error;
  }
};

export const saveCountryVisited = async (ccn3, notes) => {
  try {
    const response = await api.post("/country", {
      ccn3,
      notes,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar país visitado:", error);
    throw error;
  }
};

export const updateCountryVisited = async (id, notes) => {
  try {
    const response = await api.put(`/country/${id}`, { notes });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar relato do país:", error);
    throw error;
  }
};

