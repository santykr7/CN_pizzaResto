const initialState = {
  orders: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }
    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload
            ? { ...order, status: "Cancelled" }
            : order
        ),
      }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.orderId === action.payload.orderId) {
            if (action.payload.action === "next") {
              const nextStage = getNextStage(order.status)
              return { ...order, status: nextStage }
            } else if (action.payload.action === "picked") {
              return { ...order, status: "Order Picked" }
            }
          }
          return order
        }),
      }
    case "UPDATE_TIME":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.status !== "Delivered"
            ? { ...order, timeSpent: order.timeSpent + 1 }
            : order
        ),
      }
    default:
      return state
  }
}

const getNextStage = (currentStage) => {
  const stageOrder = ["Order Placed", "Order in Making", "Order Ready"]
  const currentIndex = stageOrder.indexOf(currentStage)
  const nextIndex = currentIndex + 1

  if (nextIndex < stageOrder.length) {
    return stageOrder[nextIndex]
  } else {
    return currentStage
  }
}

export default rootReducer
