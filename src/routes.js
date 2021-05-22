import Main from '~/pages/Main.svelte'
import Game from '~/pages/Game.svelte'
import History from '~/pages/History.svelte'
import About from '~/pages/About.svelte'
import Join from '~/pages/Join.svelte'
import Create from '~/pages/Create.svelte'

const routes = {
  '/': Main,
  '/about': About,
  '/join': Join,
  '/create': Create,
  '/history': History,
  '/game/:id/': Game,
}

export default routes
