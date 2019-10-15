import {
	FETCH_LOADING,
	LOADING_DONE,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from "../actions/loginActions";

const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"));
		console.log(state);
		return state;
	} else {
		return {
			isLogged:false,
			token:"",
			loading:false,
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();


const loginReducer = (state = initialState, action) => {
	let tempState = {};
	switch(action.type) {
		case FETCH_LOADING:
			tempState = {
				...state,
				loading:true,
				error:""
			}
			return tempState;
		case LOADING_DONE:
			tempState = {
				...state,
				loading:false,
				error:""
			}
			return tempState;
		case LOGIN_SUCCESS:
			tempState = {
				loading:false,
				error:"",
				token:action.token,
				isLogged:true
			}
			saveToStorage(tempState);
			return tempState;			
		case LOGIN_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case REGISTER_SUCCESS:
			tempState = {
				...state,
				loading:false
			}
			return tempState;
		case REGISTER_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				error:"",
				isLogged:false,
				token:""
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				loading:false,
				error:action.error,
				isLogged:false,
				token:""
			}
			saveToStorage(tempState);
			return tempState;			
		default:
			return state;
	}
}

export default loginReducer;