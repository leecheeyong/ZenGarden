<script>
  import { audioManager } from './audioManager.js'
  
  let volume = 50
  let isMuted = false
  
  function toggleMute() {
    isMuted = !isMuted
    audioManager.setVolume(isMuted ? 0 : volume / 100)
  }
  
  function handleVolumeChange() {
    if (!isMuted) {
      audioManager.setVolume(volume / 100)
    }
  }
</script>

<div class="audio-controls bg-white/80 backdrop-blur-sm rounded-2xl p-4 zen-shadow flex items-center space-x-4">
  <button
    on:click={toggleMute}
    class="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-300"
    title={isMuted ? 'Unmute' : 'Mute'}
  >
    {#if isMuted}
      <svg class="w-5 h-5 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.86 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.86l3.523-2.814a1 1 0 011.617.814zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
        <path d="M3 3l14 14" stroke="currentColor" stroke-width="2"/>
      </svg>
    {:else}
      <svg class="w-5 h-5 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.86 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.86l3.523-2.814a1 1 0 011.617.814zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
      </svg>
    {/if}
  </button>
  
  <div class="flex items-center space-x-2">
    <span class="text-sm text-stone-500 font-medium">Volume</span>
    <input
      type="range"
      min="0"
      max="100"
      bind:value={volume}
      on:input={handleVolumeChange}
      class="w-24 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-300"
      disabled={isMuted}
    />
    <span class="text-sm text-stone-400 font-medium min-w-[2rem]">{isMuted ? '0' : volume}</span>
  </div>
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #57534e;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  input[type="range"]::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #57534e;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  input[type="range"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>