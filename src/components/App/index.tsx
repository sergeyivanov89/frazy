import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";

import Navbar from "../Navbar";
import { routerConfig } from "@/shared/routerConfig";

const App = () => {
  return (
    <div className="">
      <Navbar />

      <Suspense fallback={<Spinner>Loading...</Spinner>}>
        <Routes>
          {routerConfig.map((props) => (
            <Route key={props.path} {...props} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
