import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
