const initialState = {
    isLoading: true,
    data: '',
    dataBefore: '',
    message: ''
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'ADD_TRANSACTION_FULFILLED':
            return {
                ...state,
                data: action.payload.data,
                message: action.payload.data.message,
                isLoading: false
            }

        case 'ADD_TRANSACTION_REJECTED':
            return {
                ...state,
                message: action.payload.data.message,
                isLoading: false
            }

        case 'GET_TRANSACTIONS':
            return {
                ...state,
                dataBefore: action.payload,
                isLoading: false
            }

        case 'PATCH_TRANSACTION':
            return {
                ...state,
                dataBefore: action.payload.dataBefore,
                isLoading: false
            }

        case 'PUSH_TRANSACTION':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }

        default:
            return state
    }
}