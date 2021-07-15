export const messageType = {
  chat: 'chat',
  command: 'command',
}

export function messageFactory(message, type) {
  if (!messageType[type]) throw new Error("type should be one of the key of 'messageType'")
  const ret = {
    message,
    type,
  }

  return JSON.stringify(ret)
}
