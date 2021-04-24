import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/header'
import { Player } from '../components/player'
import { PlayerContextProvider } from '../context/playerContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
