import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateOrderStatus, updateTime } from "../store/actions"

const KitchenInterface = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(updateTime())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [dispatch, orders])

  const handleUpdateOrderStatus = (orderId, action) => {
    dispatch(updateOrderStatus(orderId, action))
  }

  const getMakingTime = (size) => {
    // Define making times based on pizza size
    const makingTimes = {
      Small: 180, // 3 minutes
      Medium: 240, // 4 minutes
      Large: 300, // 5 minutes
    }

    return makingTimes[size] || 0
  }

  const renderOrdersByStage = (stage) => {
    return orders
      .filter((order) => order.status === stage)
      .map((order) => {
        const makingTime = getMakingTime(order.size)
        const overdue = order.timeSpent > makingTime

        return (
          <div
            key={order.orderId}
            className={`order-card ${overdue ? "overdue" : ""}`}
            style={{
              display: "grid",
              marginBottom: "5px",
            }}
          >
            <strong>Order ID:</strong> {order.orderId},{" "}
            {order.status === "Order Picked" && (
              <>
                <strong>Status:</strong> {order.status}
              </>
            )}
            {order.status !== "Order Picked" && (
              <>
                <strong>Type:</strong> {order.type}, <strong>Size:</strong>{" "}
                {order.size}, <strong>Base:</strong> {order.base},{" "}
                <strong>Status:</strong> {order.status},{" "}
                <strong>Time Spent:</strong> {order.timeSpent} seconds
              </>
            )}
            <div className='button-container'>
              {order.status !== "Order Picked" && (
                <button
                  onClick={() => handleUpdateOrderStatus(order.orderId, "next")}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )
      })
  }

  return (
    <div className='interface'>
      <h2>Kitchen Status</h2>

      <div className='orders-container'>
        <div className='order-section'>
          <h3>Order Placed</h3>
          {renderOrdersByStage("Order Placed")}
        </div>

        <div className='order-section'>
          <h3>Order in Making</h3>
          {renderOrdersByStage("Order in Making")}
        </div>

        <div className='order-section'>
          <h3>Order Ready</h3>
          {renderOrdersByStage("Order Ready")}
        </div>

        <div className='order-section'>
          <h3>Order Picked</h3>
          {renderOrdersByStage("Order Picked")}
        </div>
      </div>
    </div>
  )
}

export default KitchenInterface
