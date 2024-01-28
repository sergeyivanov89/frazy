import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useSelector } from "react-redux";

import Navbar from "../Navbar";
import { routerConfig } from "@/shared/routerConfig";
import type { RootState } from "@/redux/types";

const App = () => {
  const header = useSelector((state: RootState) => state.app.header);

  return (
    <div className="d-flex flex-column h-100">
      <header className="px-5 py-4 bg-dark text-light fs-1 text-center">
        {header}
      </header>

      <main className="p-5 flex-grow-1 bg-light">
        <Suspense fallback={<Spinner>Loading...</Spinner>}>
          <Routes>
            {routerConfig.map((props) => (
              <Route key={props.path} {...props} />
            ))}
          </Routes>
        </Suspense>
      </main>

      <footer className="bg-dark">
        <Navbar />
      </footer>
    </div>
  );
};

export default App;
