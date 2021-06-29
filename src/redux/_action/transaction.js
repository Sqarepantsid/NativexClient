import axios from 'axios'

import env from '../../env/env'

export const getTransactions = (id, data) => {
    dataBefore = {
        id: id,
        tableNumber: data,
        finishedTime: null,
        subtotal: null,
        discount: 0,
        serviceCharge: 10,
        tax: 5,
        isPaid: true
    }
    return {
        type: 'GET_TRANSACTIONS',
        payload: dataBefore
    }
}

export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios.post(env.host + 'transaction', data)
    }
}

export const patchTransaction = (data) => {
    return {
        type: 'PATCH_TRANSACTION',
        payload: data
    }
}

export const pushTransaction = (id, data) => {
    return {
        type: 'PUSH_TRANSACTION',
        payload: axios.patch(env.host + 'transaction', id, { data })
    }
}
