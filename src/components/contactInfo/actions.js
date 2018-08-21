import c from './constants'

export function persistVals(componentVals) {
    return { 
        type: c.PERSIST_INFO, 
        payload: componentVals 
    }
}