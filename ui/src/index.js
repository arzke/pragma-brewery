import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import '../static/app.scss'

const App = () => (
  <div>
    <Header />
    <div className='page' />
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
