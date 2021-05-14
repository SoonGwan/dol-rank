import type {applySummonerRequest}  from '../repository/summoner.repository';

export const applySummonerValidate = (request:applySummonerRequest) => {
  const {generation, name, lolNickName, position} = request

  if(generation === 0 || name === "" || lolNickName === "" || position ==="") {
    return false;

  }

    return true;
};