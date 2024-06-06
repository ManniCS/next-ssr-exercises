import { produce } from 'immer';

function reducer(state, action) {
  const nextState = produce(state, (draftState) => {
    switch (action.type) {
      case 'initialize': { 
        return []
      }
      case 'add-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.splice(itemIndex, 1);
        return;
      }
    }
  });
  window.localStorage.setItem("items", JSON.stringify(nextState))
  console.log(nextState);
  return nextState
}

export default reducer;
