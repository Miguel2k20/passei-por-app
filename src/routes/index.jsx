import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../containers/Home";
import NotFound from "../containers/NotFound";
import SearchCountries from "../containers/SearchCountries";
import VisitedCountries from "../containers/CountriesVisited";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-countries" element={<SearchCountries />} />
        <Route path="/visited-coutries" element={<VisitedCountries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
