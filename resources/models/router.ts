import produce from 'immer'

export type RouterStateType = {
  route: string
}

const initialState: RouterStateType = {
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
