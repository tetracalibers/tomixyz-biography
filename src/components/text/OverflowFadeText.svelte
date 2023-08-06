<script lang="ts">
  import { onMount } from "svelte"

  export let as: keyof HTMLElementTagNameMap = "span"
  export let text: string
  export let backgroundColor = "rgb(241,245,249)"

  let el: HTMLElement
  let wrapperEl: HTMLSpanElement
  let isOverflowRight = false
  let isOverflowLeft = false

  onMount(() => {
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const element = <HTMLElement>entry.target
        const isOverflow = element.offsetWidth < element.scrollWidth
        if (!isOverflow) return
        isOverflowRight = entry.intersectionRatio === 1
        isOverflowLeft = entry.intersectionRatio !== 1
      },
      {
        root: wrapperEl,
        threshold: 1.0
      }
    )
    intersectionObserver.observe(el)

    return () => intersectionObserver.disconnect()
  })
</script>

<div
  class="shadow-area"
  class:shadowRight={isOverflowRight}
  class:shadowLeft={isOverflowLeft}
  style:--background={backgroundColor}
>
  <div class="wrapper" bind:this={wrapperEl}>
    <svelte:element this={as} bind:this={el} class="text" {...$$restProps}>
      {text}
    </svelte:element>
  </div>
</div>

<style>
  .wrapper {
    overflow-y: hidden;
  }

  .shadow-area {
    --transparent: rgba(255, 255, 255, 0);
  }

  .shadowRight {
    -webkit-mask-image: linear-gradient(to right, var(--background) 90%, var(--transparent));
    mask-image: linear-gradient(to right, var(--background) 90%, var(--transparent));
  }

  .shadowLeft {
    -webkit-mask-image: linear-gradient(to left, var(--background) 90%, var(--transparent));
    mask-image: linear-gradient(to left, var(--background) 90%, var(--transparent));
  }

  .text {
    min-width: fit-content;
  }
</style>
