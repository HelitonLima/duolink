import { summonerInterface } from "./summonerInterface"

interface roleInterface {
    icon: string,
    name: string
}

export interface userInterface{
    id?: string
    email: string
    password?: string
    name: string
    nickname: string
    playRole: roleInterface[]
    searchRole: roleInterface[]
    soloqData?: summonerInterface
}