import { ApolloProvider } from '@apollo/client'
import './App.css'
import client from './api/apolloClient'
import ProductList from './page/ProductList'

function App() {
  return (
    <ApolloProvider client={client}>
      <ProductList />
    </ApolloProvider>
  )
}

export default App
