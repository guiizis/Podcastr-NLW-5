import { useContext, createContext } from 'react'

interface Episode {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}


interface PlayerContextData {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    play: (Episode: Episode) => void
    togglePlay: () => void
    playList: (episodeList, index) => void
}

export const PlayerContext = createContext({} as PlayerContextData)