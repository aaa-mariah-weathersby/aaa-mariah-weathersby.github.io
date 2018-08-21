import c from './constants'

export function persistPageState(state) {
    return {
        type: c.PERSIST_PAGE_STATE,
        payload: state
    }
}