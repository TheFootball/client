import Main from '~/pages/Main.svelte'
import Game from '~/pages/Game.svelte'

const routes = {
  '/': Main,
  '/game/:id/': Game,
}

export default routes
