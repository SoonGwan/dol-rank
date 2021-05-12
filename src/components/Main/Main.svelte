<script context="module" lang="ts">
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { RankType } from "../../enum/RankType";
  import Nav from "../Nav/Nav.svelte";

  export let summoners;
  let rankType = RankType.TOTAL;

  console.log(summoners);
</script>

<Nav />

<div class="MainWrapper">
  <div class="MainItemSection">
    <div class="SelectWrapper">
      <button
        class={rankType === RankType.TOTAL
          ? "SelectItem selected"
          : "SelectItem"}
        on:click={() => (rankType = RankType.TOTAL)}>전채</button
      >
      <button
        class={rankType === RankType.TOP ? "SelectItem selected" : "SelectItem"}
        on:click={() => (rankType = RankType.TOP)}>탑</button
      >
      <button
        class={rankType === RankType.JUG ? "SelectItem selected" : "SelectItem"}
        on:click={() => (rankType = RankType.JUG)}>정글</button
      >
      <button
        class={rankType === RankType.MID ? "SelectItem selected" : "SelectItem"}
        on:click={() => (rankType = RankType.MID)}>미드</button
      >
      <button
        class={rankType === RankType.AD ? "SelectItem selected" : "SelectItem"}
        on:click={() => (rankType = RankType.AD)}>원딜</button
      >
      <button
        class={rankType === RankType.SUP ? "SelectItem selected" : "SelectItem"}
        on:click={() => (rankType = RankType.SUP)}>서폿</button
      >
    </div>
  </div>
</div>

<style>
  .MainWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .MainItemSection {
    width: 70%;
    /* align-items: center; */
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
  }

  .SelectWrapper {
    display: flex;
  }

  .SelectItem {
    display: flex;
    padding: 8px 30px;
    color: white;
    border: none;
    cursor: pointer;
  }

  .SelectItem:focus {
    outline: none;
  }

  .selected {
    background-color: rgb(100, 130, 228);
  }
</style>
