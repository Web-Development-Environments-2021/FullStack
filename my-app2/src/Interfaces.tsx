export interface playerInfo{
    player_id:number,
      position: number,
      name: string,
      picture: string,
      teamName:string
}

export interface teamInfo{
    logo:string,
      name:string,
      id: number
}

export interface playerPreviewProps{
    playersData:playerInfo[]
}

export interface teamPreviewProps{
    teamsData:teamInfo[]
}
export interface requestData{
    players:playerInfo[],
    teams:teamInfo[],
    teams_name:String[]
}