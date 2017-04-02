import { Observable } from 'rxjs/Observable';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/actionTypes'

export const signupEpic = (action$, dispatch) => action$
  .ofType(SIGNUP_REQUEST)
  // .do(payload => console.log('going through signup epic', payload)) // test
  .switchMap(({ payload }) => Observable
    .ajax.post('/api/signup', payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: SIGNUP_SUCCESS,
        payload: response,
      },
    ))
    .catch(error => Observable.of(
      {
        type: SIGNUP_FAIL,
        payload: error,
      }
    ))

  )
