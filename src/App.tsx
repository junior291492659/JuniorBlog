import React from "react";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loader from "./components/Loader";
import Blog from "./pages/Blog";
// import Login from "./pages/Admin/Login";
// import BlogDetail from "./pages/Blog/blog-detail";
// import Main from "./pages/Admin/Main";
// import Interact from "./pages/Interact";
// import Images from "./pages/Images";
// import About from "./pages/About";
import { Spin, BackTop } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const BlogDetail = React.lazy(
  () =>
    import(
      /* webpackChunkName:"BlogDetail" */ /* webpackPrefetch: true */ "./pages/Blog/blog-detail"
    )
);
const Login = React.lazy(
  () => import(/* webpackChunkName:"Login" */ "./pages/Admin/Login")
);
const Main = React.lazy(
  () => import(/* webpackChunkName:"Main" */ "./pages/Admin/Main")
);
const Images = React.lazy(
  () =>
    import(
      /* webpackChunkName:"Images" */ /* webpackPrefetch: true */ "./pages/Images"
    )
);
const Interact = React.lazy(
  () =>
    import(
      /* webpackChunkName:"Interact" */ /* webpackPrefetch: true */ "./pages/Interact"
    )
);
const About = React.lazy(
  () =>
    import(
      /* webpackChunkName:"About" */ /* webpackPrefetch: true */ "./pages/About"
    )
);
const PlaceHolder = React.cloneElement(
  <Loader loading={true} />,
  {
    style: { top: "auto", color: "#f1c000" },
  },
  <div style={{ width: "100vw", height: "100vh" }}></div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <div className="App">
          <React.Suspense fallback={PlaceHolder}>
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
    </HelmetProvider>
  );
}

export default App;
