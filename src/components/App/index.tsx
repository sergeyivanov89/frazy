import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";

import Header from "@/components/Header";
import Footer from "../Footer";
import { routerConfig } from "@/shared/routerConfig";

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <main className="p-5 flex-grow-1 bg-light">
        <Suspense fallback={<Spinner>Loading...</Spinner>}>
          <Routes>
            {routerConfig.map((props) => (
              <Route key={props.path} {...props} />
            ))}
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
