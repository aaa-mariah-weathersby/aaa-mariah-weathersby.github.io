import c from './constants'

export function updateProgressBar(route) {
    return { 
        type: c.UPDATE_PROGRESS_BAR, 
        payload: route 
    }
}