import Main from '~/pages/Main.svelte'
import Game from '~/pages/Game.svelte'
import History from '~/pages/History/History.svelte'

const routes = {
  '/': Main,
  '/history': History,
  '/game/:id/': Game,
}

export default routes
