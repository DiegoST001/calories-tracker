import type { Activity } from "../types"

export type ActivityActions = 
    {type: 'save-activity', payload: {newAcivity : Activity}}|
    {type: 'set-activeId', payload: {id : Activity['id']}}|
    {type: 'delete-activity', payload: {id : Activity['id']}}|
    {type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'] //lookop
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (

    state: ActivityState = initialState,
    action: ActivityActions

) => {



    if(action.type === 'save-activity'){
        let updateActivities : Activity[] = []

        if(state.activeId){
            updateActivities = state.activities.map((item) => item.id === state.activeId ? action.payload.newAcivity : item)
        }else{
            updateActivities = [...state.activities, action.payload.newAcivity]
        }
        return{
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter(item => item.id !== action.payload.id)
        }
    }

    if( action.type === 'restart-app' ){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}