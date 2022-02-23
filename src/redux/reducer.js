import {action_types } from "./types";

const initialState = {
    userData: [],
    userUpdateData: [],
    userViewData: [],
    isLoading: false,
}

const {REGISTER_USER, UPDATE_USER, DELETE_USER, VIEW_USER, DISPLAY_USER} = action_types;

export const reducer = (state = initialState , {type,payload}) => {
    if(type === REGISTER_USER){
        return state;
    }else if(type === DISPLAY_USER){
        return {...state , userData : payload}
    }else if(type === UPDATE_USER){
        return {...state , userUpdateData : payload}
    }else if(type === DELETE_USER){
        return state;
    }else if(type === VIEW_USER){
        return {...state , userViewData : payload}
    }

    return state;
}