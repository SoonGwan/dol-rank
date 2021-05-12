export const TierConverter = ({soloTier, soloRank}) => {
    if (!soloTier || !soloRank) return 0
 
    const total = TearModel[soloTier] + RankModel[soloRank];
    
    return total
}


const TearModel = {
    IRON: 0,
    BRONZE: 4,
    SLIVER: 8,
    GOLD: 12,
    PLATINUM: 16,
    DIAMOND:20,
}

const RankModel ={
    IV: 1,
    III: 2,
    II: 3,
    I: 4
}