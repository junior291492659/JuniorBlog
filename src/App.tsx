import React from "react";
// import Header from "./components/Header";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/blog-detail";
import Login from "./pages/Admin/Login";
import { BackTop } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <div className="App">
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact component={Blog}></Route>
            <Route path="/blogdetail/:id" component={BlogDetail}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
        <BackTop />
      </Router>
      {/* <h1 className="animated bounce">An animated element</h1> */}
    </HelmetProvider>
  );
}

export default App;
