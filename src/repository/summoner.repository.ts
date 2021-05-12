import {getRequest, postRequest} from '../lib/Axios';

export const applySummoner = async(request:applySummonerRequest) => {
    const url = '/nemo/applyUser';
    const data = await postRequest({url,request});

    return data;
}

export const summonerList = async() => {
    const url = '/nemo/summoner';
    const {data} = await getRequest({url});

    return data;
}

export type applySummonerRequest = {
    generation :number;
    name:string;
    lolNickName:string;
    position:string | number
}
