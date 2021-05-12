import type {applySummonerRequest}  from '../repository/summoner.repository';

export const applySummonerValidate = (request:applySummonerRequest) => {
    if (
      request.generation === 0 ||
      request.name.trim()=== "" ||
      request.lolNickName === "" ||
      request.position === 0
    ) {
        
        return false
    }

    return true;
  };