export const placeOrder = (order) => {
  return {
    type: "PLACE_ORDER",
    payload: order,
  }
}

export const cancelOrder = (orderId) => {
  return {
    type: "CANCEL_ORDER",
    payload: orderId,
  }
}

export const updateOrderStatus = (orderId, action) => {
  return {
    type: "UPDATE_ORDER_STATUS",
    payload: { orderId, action },
  }
}

export const updateTime = () => {
  return {
    type: "UPDATE_TIME",
  }
}
