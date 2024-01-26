import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";
import cn from "classnames";

import Navbar from "../Navbar";
import { routerConfig } from "@/shared/routerConfig";
import styles from "./styles.module.scss";

const App = () => {
  return (
    <div className={cn(styles.root)}>
      <Navbar />

      <div className="p-3">
        <Suspense fallback={<Spinner>Loading...</Spinner>}>
          <Routes>
            {routerConfig.map((props) => (
              <Route key={props.path} {...props} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
