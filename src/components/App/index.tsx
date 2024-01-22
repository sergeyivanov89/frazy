import { NavLink, Route, Routes } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import MainPage from "../../pages/Main";
import RandomPhrase from "../../pages/RandomPhrase";
import Phrase from "../../pages/Phrase";

const App = () => {
  return (
    <div className="p-2">
      <Navbar color="dark">
        <Nav navbar>
          <NavItem>
            <NavLink to="/">Словарь</NavLink>
            <NavLink to="/random-phrase">Случайный</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<RandomPhrase />} path="/random-phrase" />
        <Route element={<Phrase />} path="/phrase/:phraseId" />
      </Routes>
    </div>
  );
};

export default App;
