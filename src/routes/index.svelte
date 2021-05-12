<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import { useSummoner } from "../hooks/summoner/useSummoner";

  export const load: Load = async () => {
    const [handleSummoner] = useSummoner();
    const data = await handleSummoner();
    return { props: { summoners: data } };
  };
</script>

<script lang="ts">
  import Main from "../components/Main/Main.svelte";
  export let summoners: Array<any>;
</script>

<Main {summoners} />
