import c from './constants'

export function updateSecondaryDriver(componentVals) {
    return { 
        type: c.UPDATE_SECONDARY, 
        payload: componentVals 
    }
}

export function updatePrimaryDriver(componentVals) {
    return { 
        type: c.UPDATE_PRIMARY, 
        payload: componentVals 
    }
}

export function updateDriver(componentVals) {
    return { 
        type: c.UPDATE_DRIVER, 
        payload: componentVals 
    }
}

export function removeDriver(id) {
    return {
        type: c.DRIVER_CONFIRMATION.REMOVE_DRIVER,
        payload: id
    }
}

export function persistPageState(state) {
    return {
        type: c.PERSIST_PAGE_STATE,
        payload: state
    }
}
