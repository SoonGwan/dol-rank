<script lang="ts">
  import { TierConverter } from "$lib/TierConventer";
  import { useSummoner } from "../../hooks/summoner/useSummoner";
  import { RankType } from "../../enum/RankType";
  import Modal from "../Modal/Modal.svelte";
  import Nav from "../Nav/Nav.svelte";
  import Summoner from "../Summoner/Summoner.svelte";
  import { applySummonerValidate } from "../../validation/applySummoner.validation";
  import IoIosInformationCircle from "svelte-icons/io/IoIosInformationCircle.svelte";
  import { GenerationType } from "../../enum/GenerationType";

  type summonersProps = {
    accountId: string;
    flexLosses: null | number;
    flexRank: null | string;
    flexTier: null | string;
    flexWins: null | number;
    generation: number;
    id: string;
    lolName: string;
    lolNickName: string;
    name: string;
    position: string;
    profileIconId: number;
    puuid: string;
    soloLosses: null | number;
    soloRank: null | string;
    soloTier: null | string;
    soloWins: null | number;
    summonerLevel: number;
  };

  export let summoners: summonersProps[];
  let rankType = RankType.TOTAL;
  $: generationType = GenerationType.TOTAL;

  $: filterSummoner = summoners
    .sort((a, b) => {
      return TierConverter(b) - TierConverter(a);
    })
    .filter((args: summonersProps) => {
      return args.position.includes(rankType);
    })
    .filter((args: summonersProps) => {
      if (generationType === "") {
        return args;
      } else {
        return args.generation === generationType;
      }
    });

  $: isOpen = false;

  $: handleOpen = () => {
    isOpen = !isOpen;
  };

  const { requestSummoner, handleSummoner } = useSummoner();

  $: generation = 0;
  $: name = "";
  $: lolNickName = "";
  $: position = "";

  $: request = {
    generation,
    name,
    lolNickName,
    position,
  };

  const handleRequestSummoner = async () => {
    try {
      if (!applySummonerValidate(request)) {
        alert("다 채워 주세요.");

        return;
      }

      const res = await requestSummoner(request);

      if (res.status === 200) {
        alert("성공");
        handleOpen();
        summoners = await handleSummoner();
      }
    } catch (err) {
      return err;
    }
  };
</script>

<svelte:head>
  <title>돌랭-DOL</title>
</svelte:head>

<Nav />
<div class="MainWrapper">
  <div class="MainItemSection">
    <div class="GithubWrapper">
      <div class="starGiveMe">
        <div class="icon"><IoIosInformationCircle /></div>
        <a href="https://github.com/SoonGwan/dol-rank" target="_blank">
          여기를 클릭해서 저에게 스타를 주세요!
        </a>
      </div>

      <div class="starGiveMe">
        <div class="icon"><IoIosInformationCircle /></div>
        <a href="https://github.com/SoonGwan/dol-rank/issues" target="_blank">
          이슈를 등록하여 새로운 기능이나, 버그를 알려주세요!
        </a>
      </div>
    </div>

    <div class="SelectWrapper">
      <div class="Select">
        <button
          class={rankType === RankType.TOTAL
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.TOTAL)}>전체</button
        >
        <button
          class={rankType === RankType.TOP
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.TOP)}>탑</button
        >
        <button
          class={rankType === RankType.JUG
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.JUG)}>정글</button
        >
        <button
          class={rankType === RankType.MID
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.MID)}>미드</button
        >
        <button
          class={rankType === RankType.AD
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.AD)}>원딜</button
        >
        <button
          class={rankType === RankType.SUP
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (rankType = RankType.SUP)}>서폿</button
        >
      </div>

      <button class="apply" on:click={handleOpen}>신청하기</button>
    </div>
    <div class="SelectGenerationWrapper">
      <div class="Select">
        <button
          class={generationType === GenerationType.TOTAL
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (generationType = GenerationType.TOTAL)}>전체</button
        >
        <button
          class={generationType === GenerationType.G4
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (generationType = GenerationType.G4)}>4기</button
        >
        <button
          class={generationType === GenerationType.G5
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (generationType = GenerationType.G5)}>5기</button
        >
        <button
          class={generationType === GenerationType.G6
            ? "SelectItem selected"
            : "SelectItem"}
          on:click={() => (generationType = GenerationType.G6)}>6기</button
        >
      </div>
    </div>
    {#if isOpen === true}
      <Modal {isOpen} handleCloseModal={handleOpen}>
        <div class="inputWrapper">
          <div class="topTitle">기수를 선택해 주세요.</div>
          <select class="selectInput" name="" id="" bind:value={generation}>
            <option value="">기수를 선택해 주세요.</option>
            <option value="1">1기</option>
            <option value="2">2기</option>
            <option value="3">3기</option>
            <option value="4">4기</option>
            <option value="5">5기</option>
            <option value="6">6기</option>
          </select>
        </div>
        <div class="inputWrapper">
          <div class="topTitle">주 포지션을 선택해주세요.</div>
          <select class="selectInput" name="" id="" bind:value={position}>
            <option value="">주 포지션을 선택해 주세요.</option>
            <option value="탑">탑</option>
            <option value="정글">정글</option>
            <option value="미드">미드</option>
            <option value="원딜">원딜</option>
            <option value="서폿">서폿</option>
          </select>
        </div>

        <div class="inputWrapper">
          <div class="topTitle">자신의 이름을 입력해 주세요.</div>
          <input class="input" type="text" bind:value={name} />
        </div>
        <div class="inputWrapper">
          <div class="topTitle">롤 닉네임을 입력해 주세요.</div>
          <input class="input" type="text" bind:value={lolNickName} />
        </div>
        <div class="inputWrapper">
          <button class="applyButton" on:click={() => handleRequestSummoner()}
            >저를 등록할래요!</button
          >
        </div>
      </Modal>
    {:else}{/if}

    <div class="SummonerInfoTopDescription">
      <div class="rank">순위</div>
      <div class="summoner">소환사</div>
      <div class="name">이름(기수)</div>
      <div class="tier">티어</div>
      <div class="level">레벨</div>
      <div class="rate">승률</div>
    </div>

    {#each filterSummoner as summoner, index (summoner.id)}
      <Summoner
        position={summoner.position}
        generation={summoner.generation}
        idx={index}
        iconImg={summoner.profileIconId}
        name={summoner.name}
        nickName={summoner.lolNickName}
        level={summoner.summonerLevel}
        soloRank={summoner.soloRank}
        soloTier={summoner.soloTier}
        soloWins={summoner.soloWins}
        soloLosses={summoner.soloLosses}
        flexRank={summoner.flexRank}
        flexTier={summoner.flexTier}
        flexWins={summoner.flexWins}
        flexLosses={summoner.flexLosses}
      />
    {/each}
  </div>
</div>

<style scoped lang="scss">
  .GithubWrapper {
    display: flex;

    & > * + * {
      margin-left: 10px;
    }
  }

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

    @media screen and (max-width: 800px) {
      width: 90%;
    }
  }

  .SelectWrapper {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    justify-content: space-between;

    /* @media screen and (max-width: 800px) {
      display: none;
    } */
  }

  .SelectGenerationWrapper {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin-bottom: 30px;
  }

  .SelectItem {
    display: flex;
    width: 64px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    /* padding: 0px 30px; */
    border: none;
    cursor: pointer;
    /* color: rgb(100, 130, 228); */
    color: white;
    transition: all 0.25s ease;

    @media screen and (max-width: 800px) {
      padding: 8px 12px;
      margin-top: 10px;
    }
  }

  .SelectItem:focus {
    outline: none;
  }

  .selected {
    background-color: rgb(100, 130, 228);
    color: white;
  }

  .SummonerInfoTopDescription {
    width: 100%;
    padding: 20px 40px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }

  .rank {
    width: 30px;

    @media screen and (max-width: 800px) {
      visibility: hidden;
    }
  }

  .summoner {
    width: 240px;
    margin-left: 20px;
    @media screen and (max-width: 800px) {
      width: 180px;
      margin-left: 10px;
    }
  }

  .name {
    width: 100px;
    @media screen and (max-width: 800px) {
      width: 80px;
    }
  }

  .tier {
    width: 140px;

    @media screen and (max-width: 800px) {
      width: 120px;
    }
  }

  .level {
    width: 100px;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  .Select {
    display: flex;
  }

  .apply {
    background-color: rgb(100, 130, 228);
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 0px 20px;

    @media screen and (max-width: 800px) {
      margin-top: 10px;
      padding: 8px 12px;
    }
  }

  .inputWrapper {
    width: 100%;
  }

  .topTitle {
    color: grey;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .selectInput {
    border: none;
    border-radius: 4px;
    width: 100%;
    padding: 10px 0px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    margin-bottom: 10px;
    cursor: pointer;
  }

  .selectInput:focus {
    outline: none;
  }

  .input {
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    margin-bottom: 10px;
    box-sizing: border-box;
    border: none;
    font-size: 14px;
  }

  .input:focus {
    outline: none;
  }
  .rate {
    @media screen and (max-width: 800px) {
      margin-left: 0;
      width: 30px;
    }
  }
  .applyButton {
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    border-radius: 14px;
    border: none;
    padding: 10px;
    background-color: rgb(100, 130, 228);
    color: white;
    font-size: 14px;
    cursor: pointer;
  }

  .applyButton:focus {
    outline: none;
  }

  .starGiveMe {
    display: flex;
    font-size: 14px;
    align-items: center;
    margin-bottom: 10px;

    & > * + * {
      margin-left: 5px;
    }
  }

  .icon {
    width: 20px;
    color: rgb(100, 130, 228);
  }
</style>
