const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const isAlreadyInCart = state.some(item => item.id === action.payload.id);
        if (isAlreadyInCart) {
          return state; // Jeśli pozycja jest już w koszyku, zwróć niezmieniony stan
        } else {
          return [...state, action.payload];
        }
      case 'REMOVE_FROM_CART':
        return state.filter((item) => item.id !== action.payload);
      case 'CLEAR_CART':
        return [];
      default:
        return state;
    }
  };
  
  export default cartReducer;
  