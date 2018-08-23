export const validUsername = username => {
  if (username.length < 1) {
    return 'Username cannot be blank.';
  } else if (!/^[a-z0-9._]+$/i.test(username)) {
    return 'Username can only contain alphanumeric characters, periods, and underscores.';
  } else if (username.length > 60) {
    return 'Username is too long.';
  } else {
    return 'valid';
  }
}

export const validEmail = email => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return 'Invalid email.'
  } else {
    return 'valid';
  }
}

export const validPassword = password => {
  if (password.length < 8) {
    return 'Password is too short.';
  } else if (password.length > 60) {
    return 'Password is too long.';
  } else {
    return 'valid';
  }
}

