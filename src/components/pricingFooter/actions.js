import c from './constants'

export function updateFooterState(newState) {
    return { 
        type: c.UPDATE_FOOTER_STATE, 
        payload: newState 
    }
}

export function updateFooterSavings(newPrice) {
    return { 
        type: c.UPDATE_FOOTER_SAVINGS, 
        payload: newPrice 
    }
}