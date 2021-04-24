import { createContext, useState, ReactNode, useContext } from 'react'

interface Episode {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

interface playerProviderContextProps {
  children: ReactNode
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  hasNext: boolean
  isShuffeling: boolean
  isLooping: boolean
  hasPrevious: boolean
  toggleLooping: () => void
  play: (Episode: Episode) => void
  togglePlay: () => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  toggleShuffle: () => void
  clearEpisodeList: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({
  children,
}: playerProviderContextProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
  const [isPlaying, setisPlaying] = useState(false)
  const [isLooping, setisLooping] = useState(false)
  const [isShuffeling, setisShuffeling] = useState(false)

  const hasNext = isShuffeling || currentEpisodeIndex + 1 < episodeList.length
  const hasPrevious = currentEpisodeIndex - 1 > 0

  function play(episode: Episode) {
    setEpisodeList([episode])
    setcurrentEpisodeIndex(0)
    setisPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setcurrentEpisodeIndex(index)
    setisPlaying(true)
  }

  function playNext() {
    if (isShuffeling) {
      const nextRandonIndex = Math.floor(Math.random() * episodeList.length)
      setcurrentEpisodeIndex(nextRandonIndex)
    } else if (hasNext) {
      setcurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1

    if (previousEpisodeIndex > 0) {
      setcurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function togglePlay() {
    setisPlaying(!isPlaying)
  }

  function toggleShuffle() {
    setisShuffeling(!isShuffeling)
  }

  function toggleLooping() {
    setisLooping(!isLooping)
  }

  function clearEpisodeList() {
    setEpisodeList([])
    setcurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffeling,
        play,
        togglePlay,
        playList,
        playPrevious,
        playNext,
        toggleLooping,
        toggleShuffle,
        clearEpisodeList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
