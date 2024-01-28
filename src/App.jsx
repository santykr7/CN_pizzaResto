import React from "react"
import { Provider } from "react-redux"
import "./App.css"
import store from "./store/store"
import CustomerInterface from "./components/CustomerInterface"
import KitchenInterface from "./components/KitchenInterface"
import MainDisplay from "./components/MainDisplay"

const App = () => {
  return (
    <Provider store={store}>
      <div className='app-container'>
        <h1>Pizza Restaurant Simulation</h1>
        <div className='interface-container'>
          <CustomerInterface />
          <KitchenInterface />
        </div>
        <MainDisplay />
      </div>
    </Provider>
  )
}

export default App
