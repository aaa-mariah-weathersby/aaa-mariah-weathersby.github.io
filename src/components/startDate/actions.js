import c from './constants'

export function persistPageState(state) {
    console.log("persist")
    return {
        type: c.PERSIST_PAGE_STATE,
        payload: state
    }
}
