<script lang="ts">
  import { blur } from "svelte/transition";
  export let position: string;
  export let idx: number;
  export let iconImg: number;
  export let name: string;
  export let nickName: string;
  export let level: number;
  export let soloRank: string;
  export let soloTier: string;
  export let flexRank: string;
  export let flexTier: string;
  export let soloWins: number;
  export let soloLosses: number;
  export let flexWins: number;
  export let flexLosses: number;
  export let generation: number;
  $: totalGame = soloWins + soloLosses;
  $: calcOdss = 100 / totalGame !== Infinity ? 100 / totalGame : null;
  $: rate = Math.floor(calcOdss * soloWins);
  import bot from "../../asset/LinePng/bot.png";
  import jg from "../../asset/LinePng/jg.png";
  import mid from "../../asset/LinePng/mid.png";
  import top from "../../asset/LinePng/top.png";
  import sup from "../../asset/LinePng/sup.png";
</script>

<a href={`https://poro.gg/summoner/kr/${nickName}`} target="_blank">
  <div class="SummonerWrapper" transition:blur={{ amount: 20 }}>
    <div class="index">{idx + 1}</div>
    <div class="lolIcon">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/profileicon/${iconImg}.png`}
        alt=""
      />
    </div>
    <div class="lolNickName">
      {nickName}
    </div>

    <div class="name">
      {name}({generation}기)
    </div>

    <div class="rank">
      {#if soloTier === null}
        언랭
      {:else}
        {soloTier} / {soloRank}
      {/if}
    </div>
    <div class="level">
      Lv.{level}
    </div>
    <!-- svelte-ignore empty-block -->
    {#if soloTier === null}{:else}
      <div class="odds">
        <div
          class="win"
          style="{`width: ${rate + 1}%;`} 
        padding-left:10px; 
        border-radius: 4px 0px 0px 4px;
        box-sizing:border-box; 
        background-color:#6482e4; 
        height:100%; 
        display:flex; 
        align-items:center;"
        >
          {soloWins}
        </div>
        <div class="loss">{soloLosses}</div>
      </div>
      <div class="rate">
        {rate}%
      </div>
    {/if}
    <div class="positionIcon">
      <img
        src={position === "탑"
          ? top
          : position === "정글"
          ? jg
          : position === "미드"
          ? mid
          : position === "원딜"
          ? bot
          : sup}
        alt=""
      />
    </div>
  </div>
</a>

<style scoped lang="scss">
  .positionIcon > img {
    margin-left: 20px;
    width: 40px;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  .SummonerWrapper {
    width: 100%;
    padding: 20px 40px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 5%);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: white;

    transition: all 0.25s ease;
    @media screen and (max-width: 800px) {
      padding: 10px;
    }

    &:hover {
      background-color: darken(white, 5%);
    }
  }

  .lolNickName {
    width: 160px;
    word-break: break-all;
    font-weight: bold;
    font-size: 16px;

    @media screen and (max-width: 800px) {
      width: 120px;
      font-size: 14px;
      overflow: hidden;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .index {
    width: 30px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 800px) {
      font-size: 12px;
    }
  }
  .name {
    color: #787878;
    width: 100px;

    @media screen and (max-width: 800px) {
      width: 80px;
    }
  }

  .rank {
    color: #787878;
    width: 140px;
    @media screen and (max-width: 800px) {
      width: 120px;
    }
  }

  .level {
    color: #787878;
    width: 100px;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  .lolIcon > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0px 20px;
    @media screen and (max-width: 800px) {
      width: 28px;
      height: 28px;
      margin: 0px 10px;
    }
  }

  .loss {
    text-align: right;
    padding-right: 10px;
  }

  .odds {
    width: 150px;
    height: 20px;
    position: relative;
    display: flex;
    vertical-align: middle;
    background-color: #ee5a52;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  .rate {
    color: #787878;
    margin-left: 10px;

    @media screen and (max-width: 800px) {
      margin-left: 0;
      width: 30px;
    }
  }
</style>
