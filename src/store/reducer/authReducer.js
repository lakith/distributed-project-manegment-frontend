import * as authActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'

const initialState = {
    loading:false,
    submit:false,
    errors:null,
    authSubmitRedirect:false,
    accessToken:null,
    userData:null
}

const authStart = (state,action) => {
    return updatedObject(state,{loading:true,errors:null,submit:true,authSubmitRedirect:false})
}

const authSubmitSuccess = (state,action) => {
    return updatedObject(state,{loading:false,errors:null,submit:false,authSubmitRedirect:true})
}

const authSubmitErrors = (state,action) => {
    return updatedObject(state,{errors:action.errors,loading:false,submit:false,authSubmitRedirect:false})
}

const setAuthRedirectPath = (state,action) => {
    return updatedObject(state,{setAuthRedirectPath:null,submit:false})
}

const authLogin = (state,action) => {
    return updatedObject(state,
        {
        setAuthRedirectPath:true,
        loading:false,
        errors:null,
        accessToken : action.accessToken,
        userData:action.userData
        })
}

const authLogout = (state,action) => {
    return updatedObject(state,
        {
            setAuthRedirectPath:true,
            loading:false,
            errors:null,
            accessToken:null,
            userData:null
        })
}

const authFail = (state,action) => { 
    return updatedObject (state,{
        errors:null,
        loading:false,
        setAuthRedirectPath:false
    })
}



const reducer = (state = initialState,action)=>{
    switch(action.type){
        case authActions.AUTH_START:
            return authStart(state,action)
        case authActions.AUTH_SUBMIT_SUCCESS:
            return authSubmitSuccess(state,action)
        case authActions.AUTH_SUBMIT_ERROR:
            return authSubmitErrors(state,action)
        case authActions.AUTH_SUBMIT_REDIRECT_PATH:
            return setAuthRedirectPath(state,action)
        case authActions.AUTH_SUCCCESS:
            return authLogin(state,action);
        case authActions.AUTH_FAIL:
            return authFail(state,action);
        case authActions.AUTH_LOGOUT:
            return authLogout(state,action);
        default:
            return state;
    }
}

export default reducer;