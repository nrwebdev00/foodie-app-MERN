
export const urlChecker = (url) =>{
  const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  return urlPattern.test(url);
}

export const emailChecker = (email) =>{
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
  return emailPattern.test(email)
}

export const passwordChecker = (password) =>{
  // Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
  const passwordPattern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
  return passwordPattern.test(password)
}