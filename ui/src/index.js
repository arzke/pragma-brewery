import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import ContainersData from './components/containers/ContainersData'
import '../static/app.scss'
import { NotificationsProvider } from './context/NotificationsContext'

const client = new ApolloClient({
  uri: `http://${window.location.hostname}:4000`
})

const App = () => (
  <ApolloProvider client={client}>
    <NotificationsProvider>
      <Header />
      <ContainersData />
    </NotificationsProvider>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
