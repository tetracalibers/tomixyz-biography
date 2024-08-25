<script>
  export let isExpanded
  export let canExpand
  export let isAllSubRowsExpanded
  export let depth
</script>

{#if $canExpand}
  <button on:click={() => ($isExpanded = !$isExpanded)} style:--depth={depth}>
    {#if $isExpanded}
      {#if $isAllSubRowsExpanded}
        ⬇️
      {:else}
        ⏹️
      {/if}
    {:else}
      ➡️
    {/if}
  </button>
{/if}

<style>
  button {
    padding-left: calc(var(--depth) * 1rem);
  }
</style>
