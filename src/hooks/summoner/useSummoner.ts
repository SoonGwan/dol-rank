import { summonerList } from "../../repository/summoner.repository";

export const useSummoner = () => {
    const handleSummoner = async() => {
        try {
            const {data} = await summonerList();
            console.log(data);
            return data;
        } catch(err) {
            return err;
        }
    }

    return [handleSummoner] as const;
}