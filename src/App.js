import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AppProvider } from './context'

// Pages
import Home from './pages/Home'
import SingleMovie from './pages/SingleMovie'
import Error from './pages/Error'

function App() {
  return (
    <AppProvider>
      <div className='container'>
        
        <Router>
          <Header />
          {/* Routing */}
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/movie/:id' children={<SingleMovie />}></Route>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
          {/* End Routing */}
        </Router>
      </div>
      <Footer />
    </AppProvider>
  )
}

export default App
