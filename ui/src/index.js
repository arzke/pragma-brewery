import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import ContainersData from './components/ContainersData'
import '../static/app.scss'

const client = new ApolloClient({
  uri: `http://${window.location.hostname}:4000`
})

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Header />
      <ContainersData />
    </div>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
