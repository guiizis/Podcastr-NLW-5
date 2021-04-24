import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/header'
import { Player } from '../components/player'
import { PlayerContext } from '../context/playerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
  const [isPlaying, setisPlaying] = useState(false)

  function play(episode) {
    setEpisodeList([episode])
    setcurrentEpisodeIndex(0)
    setisPlaying(true)
  }

  function togglePlay() {
    setisPlaying(!isPlaying)
  }

  return (
    <PlayerContext.Provider
      value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
