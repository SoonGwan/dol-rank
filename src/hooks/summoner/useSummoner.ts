import { applySummoner } from './../../repository/summoner.repository';
import { summonerList } from "../../repository/summoner.repository";

export const useSummoner = () => {
    const handleSummoner = async() => {
        try {
            const {data} = await summonerList();
            
            return data;
        } catch(err) {
            return err;
        }
    }

    const requestSummoner = async(request) => {
        const {data} = await applySummoner(request);
        return data
    }

    return {handleSummoner, requestSummoner} as const;
}