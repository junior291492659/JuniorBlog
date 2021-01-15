import React from "react";
// import Header from "./components/Header";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Blog from "./pages/Blog";
// import Login from "./pages/Admin/Login";
// import Main from "./pages/Admin/Main";
// import Interact from "./pages/Interact";
// import Images from "./pages/Images";
// import About from "./pages/About";
import { BackTop } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import BlogDetail from "./pages/Blog/blog-detail";
const BlogDetail = React.lazy(
  () => import(/* webpackChunkName:"BlogDetail" */ "./pages/Blog/blog-detail")
);
const Login = React.lazy(
  () => import(/* webpackChunkName:"Login" */ "./pages/Admin/Login")
);
const Main = React.lazy(
  () => import(/* webpackChunkName:"Main" */ "./pages/Admin/Main")
);
const Images = React.lazy(
  () => import(/* webpackChunkName:"Images" */ "./pages/Images")
);
const Interact = React.lazy(
  () => import(/* webpackChunkName:"Interact" */ "./pages/Interact")
);
const About = React.lazy(
  () => import(/* webpackChunkName:"About" */ "./pages/About")
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <div className="App">
          <React.Suspense fallback={null}>
            <Switch>
              <Route path="/" exact component={Blog}></Route>
              <Route
                path="/blogdetail/:id"
                exact
                component={BlogDetail}
              ></Route>
              <Route path="/blog/:tag" exact component={Blog}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/admin" component={Main}></Route>
              <Route path="/images" exact component={Images}></Route>
              <Route path="/interact" exact component={Interact}></Route>
              <Route path="/about" exact component={About}></Route>
            </Switch>
          </React.Suspense>
        </div>
        <BackTop />
      </Router>
      {/* <h1 className="animated bounce">An animated element</h1> */}
    </HelmetProvider>
  );
}

export default App;
