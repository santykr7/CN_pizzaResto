import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { placeOrder } from "../store/actions"

const CustomerInterface = ({ maxOrders = 10 }) => {
  const dispatch = useDispatch()

  const [selectedPizza, setSelectedPizza] = useState("")
  const [customization, setCustomization] = useState("")
  const [pizzaType, setPizzaType] = useState("Veg")
  const [pizzaSize, setPizzaSize] = useState("Medium")
  const [pizzaBase, setPizzaBase] = useState("Thin")

  const orders = useSelector((state) => state.orders)

  const handleOrder = () => {
    if (orders.length < maxOrders) {
      const makingTime = {
        Small: 3,
        Medium: 4,
        Large: 5,
      }

      const order = {
        orderId: new Date().getTime(),
        pizza: selectedPizza,
        customization: customization,
        type: pizzaType,
        size: pizzaSize,
        base: pizzaBase,
        status: "Order Placed",
        timeSpent: 0,
        makingTime: makingTime[pizzaSize],
      }

      dispatch(placeOrder(order))

      // Reset the form fields after placing the order
      setSelectedPizza("")
      setCustomization("")
      setPizzaType("Veg")
      setPizzaSize("Medium")
      setPizzaBase("Thin")
    } else {
      alert("Not taking any more orders for now. Please wait.")
    }
  }

  return (
    <div className='interface'>
      <h2>Place your Order Here</h2>
      <form>
        <label>
          Pizza Type:
          <select
            value={pizzaType}
            onChange={(e) => setPizzaType(e.target.value)}
          >
            <option value='Veg'>Veg</option>
            <option value='Non-Veg'>Non-Veg</option>
          </select>
        </label>
        <label>
          Pizza Size:
          <select
            value={pizzaSize}
            onChange={(e) => setPizzaSize(e.target.value)}
          >
            <option value='Large'>Large</option>
            <option value='Medium'>Medium</option>
            <option value='Small'>Small</option>
          </select>
        </label>
        <label>
          Pizza Base:
          <select
            value={pizzaBase}
            onChange={(e) => setPizzaBase(e.target.value)}
          >
            <option value='Thin'>Thin</option>
            <option value='Thick'>Thick</option>
          </select>
        </label>

        <button type='button' onClick={handleOrder}>
          Place Order
        </button>
      </form>
    </div>
  )
}

export default CustomerInterface
