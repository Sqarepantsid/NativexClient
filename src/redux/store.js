import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from '../redux/middleware'
import transaction from './_reducers/transaction'
import menus from './_reducers/menus'
import orders from './_reducers/orders'
import timer from './_reducers/timers'

const reducers = combineReducers({
    transaction,
    menus,
    orders,
    timer
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store