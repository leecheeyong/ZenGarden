<script>
  import { audioManager } from './audioManager.js'
  
  export let type = 'bamboo'
  export let sound = 'wind'
  
  let isHovered = false
  
  const plantTypes = {
    bamboo: { color: 'from-sage-400 to-sage-600', height: 'h-16', width: 'w-3' },
    grass: { color: 'from-green-300 to-green-500', height: 'h-8', width: 'w-8' },
    fern: { color: 'from-sage-300 to-sage-500', height: 'h-12', width: 'w-12' },
    moss: { color: 'from-green-200 to-sage-400', height: 'h-6', width: 'w-10' }
  }
  
  function handleMouseEnter() {
    isHovered = true
    audioManager.playSound(sound)
  }
  
  function handleMouseLeave() {
    isHovered = false
  }
</script>

<div
  class="plant-element {plantTypes[type].height} {plantTypes[type].width} cursor-pointer transition-all duration-300"
  class:hovered={isHovered}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="button"
  tabindex="0"
>
  {#if type === 'bamboo'}
    <div class="flex space-x-1 h-full items-end">
      <div class="w-1 bg-gradient-to-t {plantTypes[type].color} rounded-t-full h-full animate-zen-float"></div>
      <div class="w-1 bg-gradient-to-t {plantTypes[type].color} rounded-t-full h-4/5 animate-zen-float" style="animation-delay: 0.5s;"></div>
      <div class="w-1 bg-gradient-to-t {plantTypes[type].color} rounded-t-full h-3/4 animate-zen-float" style="animation-delay: 1s;"></div>
    </div>
  {:else if type === 'grass'}
    <div class="grid grid-cols-3 gap-1 h-full">
      {#each Array(9) as _, i}
        <div class="bg-gradient-to-t {plantTypes[type].color} rounded-t-full w-full h-full animate-gentle-pulse" style="animation-delay: {i * 0.1}s;"></div>
      {/each}
    </div>
  {:else if type === 'fern'}
    <div class="relative w-full h-full">
      <div class="absolute inset-0 bg-gradient-to-t {plantTypes[type].color} rounded-full opacity-80"></div>
      <div class="absolute top-1 left-1 w-2 h-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-40"></div>
    </div>
  {:else if type === 'moss'}
    <div class="w-full h-full bg-gradient-to-r {plantTypes[type].color} rounded-full relative">
      <div class="absolute inset-1 bg-gradient-to-br from-white to-transparent rounded-full opacity-20"></div>
    </div>
  {/if}
</div>

<style>
  .plant-element {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  .plant-element.hovered {
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15)) brightness(1.2);
  }
  
  .plant-element:hover {
    transform: scale(1.1);
  }
</style>