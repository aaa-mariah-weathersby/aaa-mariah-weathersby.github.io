import c from './constants'

export function persistCarLocation(location) {
    return { 
        type: c.CAR_LOCATION.PERSIST_CAR_LOCATION, 
        payload: location 
    }
}

export function persistCarSelection(car) {
    return {
        type: c.CAR_SELECTION.PERSIST_CAR_SELECTION,
        payload: car
    }
}

export function persistPageState(state) {
    return {
        type: c.PERSIST_PAGE_STATE,
        payload: state
    }
}
