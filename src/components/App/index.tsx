import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Navbar, Nav, NavItem, Spinner } from "reactstrap";

const Main = lazy(() => import("../../pages/Main"));
const RandomPhrase = lazy(() => import("../../pages/RandomPhrase"));
const Phrase = lazy(() => import("../../pages/Phrase"));

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

      <Suspense fallback={<Spinner>Loading...</Spinner>}>
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<RandomPhrase />} path="/random-phrase" />
          <Route element={<Phrase />} path="/phrase/:phraseId" />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
