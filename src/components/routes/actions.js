import c from './constants'


/* --- NEXT FUNCTIONALITY --- */

export function newRoute (currentRouteName, parent){

    const currentStep = parseInt(c.STEPS[currentRouteName].val)
    
    var nextStep = currentStep + 1    
    var prevStep = currentStep < 0 ? 0 : currentStep

    var updatedRoutes = parseRoutes(prevStep, nextStep)

    var nextPath = c.STEPS[updatedRoutes.nextRoute].path

    updatePage(nextPath, parent)
    return updatedRoutes

}


export function updateRouteAction(route, parent) {
    const payload = newRoute(route, parent)
    return { type: c.UPDATE_ROUTE, payload: payload }
}

/* --- NEXT FUNCTIONALITY --- */



/* --- BACK FUNCTIONALITY --- */

export function newRouteBack (currentRouteName){

    const currentStep = parseInt(c.STEPS[currentRouteName].val)

    var nextStep = currentStep - 1   
    var prevStep = currentStep - 2 < 0 ? 0 : currentStep - 2

    if (nextStep <= 0){
        nextStep = 0;
        prevStep = 0;
    }

    var updatedRoutes =  parseRoutes(prevStep, nextStep)
    return updatedRoutes

}

export function updateRouteActionBack(route) {
    const payload = newRouteBack(route)
    return { type: c.UPDATE_ROUTE, payload: payload }
}

/* --- BACK FUNCTIONALITY --- */

export function renderBack(flag){
    return { 
        type: c.RENDER_BACK, 
        payload: flag 
    }
}


/* --- HELPERS --- */

function parseRoutes (prevStep, nextStep){
    const sequence = c.STEPS

    var nextRoute =  Object.keys(sequence).find( key => sequence[key].val === nextStep );
    var prevRoute =  Object.keys(sequence).find( key => sequence[key].val === prevStep ); 

    var updatedRoutes = {
        nextRoute: nextRoute,
        prevRoute: prevRoute
    }

    return updatedRoutes

}

function updatePage(path, parent){
    parent.props.history.push(path)
}

/* --- HELPERS --- */

