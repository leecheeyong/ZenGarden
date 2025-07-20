<script>
  import { audioManager } from './audioManager.js'
  
  export let size = 'medium'
  export let sound = 'water'
  
  let isPressed = false
  let rotation = (Math.random() * 8 - 4).toFixed(2)
  
  const sizeClasses = {
    small: 'w-8 h-6 md:w-10 md:h-8',
    medium: 'w-12 h-9 md:w-16 md:h-12',
    large: 'w-16 h-12 md:w-20 md:h-16'
  }
  
  function handleClick() {
    isPressed = true
    audioManager.playSound(sound)
    setTimeout(() => {
      isPressed = false
    }, 350)
  }
</script>

<button
  on:click={handleClick}
  class="stone-element {sizeClasses[size]} rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 relative overflow-visible"
  class:pressed={isPressed}
  style="transform: rotate({rotation}deg);"
>
  <div class="w-full h-full rounded-full bg-gradient-to-br from-stone-400 to-stone-700 zen-shadow-lg relative overflow-hidden">
    <svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 40 30" fill="none"><ellipse cx="20" cy="15" rx="18" ry="13" fill="url(#stoneGrad)"/><defs><radialGradient id="stoneGrad" cx="0.5" cy="0.5" r="0.7"><stop offset="0%" stop-color="#fff" stop-opacity="0.2"/><stop offset="100%" stop-color="#000" stop-opacity="0.1"/></radialGradient></defs></svg>
    <div class="absolute inset-0 opacity-30">
      <div class="w-full h-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-40"></div>
    </div>
    <div class="absolute top-1 left-1 w-1/3 h-1/3 bg-white opacity-20 rounded-full blur-sm"></div>
    {#if isPressed}
      <span class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="stone-ripple"></span>
      </span>
    {/if}
  </div>
  <span class="stone-glow"></span>
</button>

<style>
  .stone-element {
    transform: translateY(0);
    cursor: pointer;
    box-shadow: 0 2px 12px 0 #33415544;
  }
  
  .stone-element:hover {
    transform: translateY(-2px) scale(1.05) rotate(var(--tw-rotate));
    filter: brightness(1.12) drop-shadow(0 0 12px #60a5fa88);
    z-index: 20;
  }
  
  .stone-element.pressed {
    transform: translateY(1px) scale(0.98) rotate(var(--tw-rotate));
    filter: brightness(0.95) drop-shadow(0 0 16px #fbbf2444);
  }
  
  .stone-element:active {
    transform: translateY(1px) scale(0.98);
  }
  
  .stone-glow {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, #60a5fa33 0%, transparent 80%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 0;
  }
  
  .stone-element:hover .stone-glow {
    opacity: 0.9;
    background: radial-gradient(circle, #fbbf2433 0%, transparent 80%);
  }
  
  .stone-ripple {
    display: block;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(circle, #fbbf24cc 0%, transparent 70%);
    animation: rippleStone 0.4s cubic-bezier(0.4,0,0.2,1);
    opacity: 0.7;
  }
  
  @keyframes rippleStone {
    0% { transform: scale(0.7); opacity: 0.7; }
    80% { transform: scale(1.2); opacity: 0.3; }
    100% { transform: scale(1.4); opacity: 0; }
  }
</style>