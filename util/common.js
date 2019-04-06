export function generateRandomMessage() {
  //https://gist.github.com/6174/6062387
  return Math.random().toString(36).substring(2, 15) +
    ' ' +
    Math.random().toString(36).substring(2, 15)
}

export function generateRandomString() {
  //https://gist.github.com/6174/6062387
  return Math.random().toString(36).substring(2, 15)
}