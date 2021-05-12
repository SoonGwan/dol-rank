<script>
  export let handleCloseModal;
  export let isOpen;
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  onMount(() => {
    isOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => (document.body.style.overflow = "unset");
  });
  import IoIosClose from "svelte-icons/io/IoIosClose.svelte";
</script>

<div class="ModalWrapper">
  <div class="BackGround" on:click={handleCloseModal} />
  <div
    class="ModalContent"
    transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
  >
    <div class="closeWrap">
      <button on:click={handleCloseModal}>
        <div class="icon"><IoIosClose /></div>
      </button>
    </div>
    <slot />
  </div>
</div>

<style scoped>
  .closeWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .closeWrap > button {
    border: none;
    background-color: rgb(100, 130, 228);
    border-radius: 4px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    cursor: pointer;
  }

  .icon {
    width: 30px;
    height: 30px;
    color: white;
  }
  .ModalWrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .BackGround {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: #000;
    opacity: 0.4;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .ModalContent {
    padding: 20px;
    border-radius: 6 px;
    width: 400px;
    height: 400px;
    background-color: white;
    z-index: 100;
    border-radius: 4px;
  }
</style>
