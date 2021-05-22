import { push } from 'svelte-spa-router'
export const go = (url) => () => {
  push(url)
}
