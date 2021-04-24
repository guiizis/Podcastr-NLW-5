import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { PlayerContext } from '../../context/playerContext'
import styles from './style.module.scss'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [progress, setProgress] = useState(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    playNext,
    playPrevious,
    togglePlay,
    hasPrevious,
    hasNext,
    isLooping,
    toggleLooping,
    toggleShuffle,
    isShuffeling,
    clearEpisodeList,
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

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

  function setProgressListener() {
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', (event) => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearEpisodeList()
    }
  }

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
          <span>{convertDurationToTimeString(progress ?? 0)}</span>
          <div className={styles.Slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider}></div>
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onEnded={handleEpisodeEnded}
            loop={isLooping}
            onLoadedMetadata={setProgressListener}
          ></audio>
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length == 1}
            onClick={() => toggleShuffle()}
            className={isShuffeling ? styles.isActive : ''}
          >
            <img src="shuffle.svg" alt="embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={() => playPrevious()}
          >
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
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={() => playNext()}
          >
            <img src="play-next.svg" alt="proxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={() => toggleLooping()}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="repeat.svg" alt="repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
