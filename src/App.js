import { Route, Switch } from 'react-router-dom';
import './App.css';
import BlogPage from './components/articlePage/BlogPage';
import { PrivateRoute } from './components/articlePage/PrivateRoute';
import LoginFormContainer from './components/login/LoginFormContainer';
import ReadArticlesContainer from './components/read articles/ReadArticlesContainer';
import ViewArticleContainer from './components/read articles/ViewArticleContainer';
import { Header } from './components/views/Navbar/Header';
import authService from './services/auth.service';

function App() {
  const isAuthenticated = authService.isAuthenticated();
  console.log(JSON.stringify(isAuthenticated));
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/login/" component={LoginFormContainer}/>
        <Route exact path={["/","/home"]} component={ReadArticlesContainer}/>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/createArticle"
          component={BlogPage}
        />
        <Route exact path="/article/:id" component={ViewArticleContainer}/>
      </Switch>
    </div>
  );
}

export default App;
