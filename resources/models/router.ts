import produce from 'immer'

const initialState = {
    route: '/',
}

const router = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'CHANGE_ROUTE':
          state.route = payload
          break
      default:
        return state
    }
  },
  {...initialState},
)

export default router
