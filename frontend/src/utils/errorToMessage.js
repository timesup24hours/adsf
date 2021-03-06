export const loginErrorToMessage = (error) => {
  if (error.status === 401) {
    return 'Wrong credentials. Please, try again !'
  }

  return error.message
}

export const signupErrorToMessage = (error) => {
  if (error.status === 500) {
    return 'Oops, something went wrong. Please, try again !'
  }

  if (error.status === 409) {
    return 'Username is already taken !'
  }

  if (error.status === 400) {
    return 'Missing credential !'
  }

  return error.message
}

export const errorToMessage = (error) => {
  if (error.status === 400) {
    return 'Something went wrong, please try again later!'
  }
  return error.message
}

export const shopByCategoryErrorToMessage = (error) => {
  if (error.status === 400) {
    return 'No items in this category yet!'
  }
  if (error.status === 500) {
    return 'something went wrong, please try again later!'
  }
  return error.message
}

export const reivewErrorToMessage = (error) => {
  if (error.status === 400) {
    return 'content is required!'
  }
  if (error.status === 500) {
    return 'something went wrong, please try again later!'
  }
  return error.message
}
