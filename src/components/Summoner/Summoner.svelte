<script lang="ts">
  import { blur } from "svelte/transition";

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
</script>

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
</div>

<style scoped>
  .SummonerWrapper {
    width: 100%;
    padding: 20px 40px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .lolNickName {
    width: 160px;
    word-break: break-all;
    font-weight: bold;
    font-size: 16px;
  }
  .index {
    width: 30px;
  }
  .name {
    color: #787878;
    width: 100px;
  }

  .rank {
    color: #787878;
    width: 140px;
  }

  .level {
    color: #787878;
    width: 100px;
  }

  .lolIcon > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0px 20px;
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
  }

  .rate {
    color: #787878;
    margin-left: 10px;
  }
</style>
