/**
 *  Create by staneyffer
 *  18-2-22
 */
let storage = window.localStorage

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  storage.setItem(name, content)
}
export const getStore = name => {
  if (!name) return
  return storage.getItem(name)
}

export const removeStore = name => {
  if (!name) return
  storage.removeItem(name)
}
