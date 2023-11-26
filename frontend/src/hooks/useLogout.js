import { useAuthContext } from "./useAuthContext";
import {useWorkoutsContext} from './useWorkoutsContext'

export const useLogout = ()=>{
    const {dispatch} = useAuthContext()
    const {dispatch: WorkoutDispatch} = useWorkoutsContext()

    const logout = ()=>{
        //removing user from storage
        localStorage.removeItem('user')

        //dispatching logout action
        dispatch({type:"LOGOUT"})
        WorkoutDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return {logout}
}