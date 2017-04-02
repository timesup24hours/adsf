import * as actionTypes from './actionTypes'
import axios from 'axios'

export const loginRequestAction = payload => ({
  type: actionTypes.LOGIN_REQUEST,
  payload,
})

export const logoutAction = () => ({
  type: actionTypes.LOGIN_OUT,
})

export const signupRequestAction = () => ({
  type: actionTypes.SIGNUP_REQUEST,
})

export function isUserExistAction(data) {
  return dispatch => {
    return axios.post('/api/isUserExist', data)
  }
}

export const signupSuccess = (payload) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload,
})

export const signupFail = (payload) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload,
})

export const userInfoChangeRequest = payload => ({
  type: actionTypes.USER_INFO_CHANGE_REQUEST,
  payload,
})
