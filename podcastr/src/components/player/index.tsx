import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { PlayerContext } from '../../context/playerContext'
import styles from './style.module.scss'

export function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="playing.svg" alt="tocando agora" />
        <strong>Tocando Agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          ></Image>

          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um Podcast Para Ouvir</strong>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.Slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider}></div>
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && <audio src={episode.url} ref={audioRef} autoPlay></audio>}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="shuffle.svg" alt="embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="play-previous.svg" alt="anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={() => togglePlay()}
          >
            {isPlaying ? (
              <img src="pause.svg" alt="Pause" />
            ) : (
              <img src="play.svg" alt="Play" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="play-next.svg" alt="proxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="repeat.svg" alt="repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
