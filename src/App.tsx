import React from "react";
// import Header from "./components/Header";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/blog-detail";
import Login from "./pages/Admin/Login";
import Main from "./pages/Admin/Main";
import Interact from "./pages/Interact";
import Images from "./pages/Images";
import { BackTop } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddArticle from "./pages/Admin/Main/AddArticle";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Blog}></Route>
            <Route path="/blogdetail/:id" exact component={BlogDetail}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/admin" component={Main}></Route>
            <Route path="/images" exact component={Images}></Route>
            <Route path="/interact" exact component={Interact}></Route>
          </Switch>
        </div>
        <BackTop />
      </Router>
      {/* <h1 className="animated bounce">An animated element</h1> */}
    </HelmetProvider>
  );
}

export default App;
