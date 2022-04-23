import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import SinglePeople from "./pages/SinglePerson";
import MoviesPage from "./pages/MoviesPage";
import SingleMovie from "./pages/SingleMovie";

const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/people/:id" element={<SinglePeople />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
