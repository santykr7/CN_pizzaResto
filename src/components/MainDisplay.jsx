import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cancelOrder, updateOrderStatus, updateTime } from "../store/actions"

const MainDisplay = () => {
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)

  const inProgressOrders = orders.filter(
    (order) => order.status !== "Order Picked" && order.status !== "Delivered"
  )

  useEffect(() => {
    const intervalIds = []

    inProgressOrders.forEach((order) => {
      if (order.status === "Order Picked" || order.status === "Cancelled") {
        return // Skip cancelled or picked orders
      }

      const intervalId = setInterval(() => {
        dispatch(updateTime(order.orderId))
      }, 1000)

      intervalIds.push(intervalId)
    })

    return () => {
      intervalIds.forEach((id) => clearInterval(id))
    }
  }, [dispatch, inProgressOrders])

  const handleUpdateOrderStatus = (orderId, action) => {
    dispatch(updateOrderStatus(orderId, action))
    setTotal((prev) => prev + 1)
  }

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId))
    alert("Your order has been cancelled")
  }

  // Convert seconds to minutes and seconds format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  // Calculate total time spent from order placed for each order
  const getOrderTotalTime = (order) => {
    if (order.status === "Order Picked" || order.status === "Cancelled") {
      const startTime = order.placedTime
      const endTime =
        order.status === "Order Picked"
          ? order.pickedTime
          : Math.floor(Date.now() / 1000)
      const totalTimeInSeconds = endTime - startTime
      return formatTime(totalTimeInSeconds)
    } else {
      return formatTime(order.timeSpent)
    }
  }

  return (
    <div className='main-display'>
      <h2>Main Display</h2>
      <div className='in-progress-container'>
        <h3>In Progress Orders</h3>
        {inProgressOrders.map((order) => (
          <div key={order.orderId} className='in-progress-card'>
            <strong>Order ID:</strong> {order.orderId},{" "}
            <strong>Time Spent:</strong> {formatTime(order.timeSpent)},{" "}
            <button
              className='pickerBtn'
              onClick={() => handleUpdateOrderStatus(order.orderId, "picked")}
            >
              Pick your order
            </button>
            <button onClick={() => handleCancelOrder(order.orderId)}>
              Cancel
            </button>
          </div>
        ))}
      </div>
      <div className='total-delivered-container'>
        <h3>Total Pizza Delivered Today</h3>
        <div className='delivered-count'>{total}</div>
      </div>
      <div className='order-summary-container'>
        <h3>Order Summary</h3>
        {orders.map((order) => (
          <div key={order.orderId} className='order-summary'>
            <strong>Order ID:</strong> {order.orderId},{" "}
            <strong>Total Time Spent:</strong> {getOrderTotalTime(order)}{" "}
            <strong>Stage:</strong> {order.status}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainDisplay
