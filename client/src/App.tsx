import React from "react";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./route-config";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="bg-light">
          <Menu />
          <div className="container">
            <Switch>
              {routes.map(({ path, component, exact }, index) => (
                <Route
                  path={path}
                  component={component}
                  key={index}
                  exact={exact}
                ></Route>
              ))}
            </Switch>
          </div>
          <footer className="bg-footer py-5 mt-5 bg-light">
            <div className="container">
              Dr NG {new Date().getFullYear().toString()}
            </div>
          </footer>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
