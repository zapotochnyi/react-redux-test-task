//libraries
import React, { useEffect } from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//css
import "./App.css";
//components
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";
import PostsContainer from "./components/PostsContainer/PostsContainer";
import UsersContainer from "./components/UsersContainer/UsersContainer";
import PostDetailsContainer from "./components/PostDetailsContainer/PostDetailsContainer";
import Loader from "./components/common/Loader";
//redux
import store from "./redux/store";
import { initializeApp } from "./redux/appReducer";
//selectors
import { getInitialized } from "./utils/appSelectors";

const App = ({ initialized, initializeApp }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <>
      {!initialized ? (
        <Loader />
      ) : (
        <div className="App">
          <HeaderContainer />
          <Switch>
            <Route
              exact
              path="/react-redux-test-task"
              render={() => <Redirect to="/users" />}
            />
            <Route exact path="/" render={() => <Redirect to="/users" />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/posts/:userId?" render={() => <PostsContainer />} />
            <Route
              path="/post/:postId?"
              render={() => <PostDetailsContainer />}
            />
          </Switch>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: getInitialized(state),
  };
};

const AppContainer = connect(mapStateToProps, {
  initializeApp,
})(App);

const PostsApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default PostsApp;
