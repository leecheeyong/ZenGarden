<script>
  import SandArea from './SandArea.svelte';
  import Stone from './Stone.svelte';
  import Plant from './Plant.svelte';
  import { onMount } from 'svelte';

  const stones = [
    { id: 1, x: '15%', y: '25%', size: 'large', sound: 'water' },
    { id: 2, x: '70%', y: '20%', size: 'medium', sound: 'stream' },
    { id: 3, x: '25%', y: '70%', size: 'small', sound: 'droplet' },
    { id: 4, x: '80%', y: '65%', size: 'medium', sound: 'waterfall' },
    { id: 5, x: '45%', y: '40%', size: 'small', sound: 'ripple' }
  ];

  const plants = [
    { id: 1, x: '10%', y: '60%', type: 'bamboo', sound: 'wind' },
    { id: 2, x: '85%', y: '30%', type: 'grass', sound: 'birds' },
    { id: 3, x: '60%', y: '80%', type: 'fern', sound: 'rustle' },
    { id: 4, x: '30%', y: '15%', type: 'moss', sound: 'forest' }
  ];

  let particles = Array.from({length: 18}, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    color: Math.random() > 0.5 ? 'bg-blue-400/40' : 'bg-pink-400/40'
  }));

  let quotes = [
    "Peace comes from within. Do not seek it without.",
    "Let go, or be dragged.",
    "The quieter you become, the more you can hear.",
    "Nature does not hurry, yet everything is accomplished.",
    "To a mind that is still, the whole universe surrenders.",
    "Flow with whatever may happen and let your mind be free.",
    "Sitting quietly, doing nothing, spring comes, and the grass grows by itself."
  ];
  let zenQuote = quotes[Math.floor(Math.random() * quotes.length)];
  function refreshQuote() {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === zenQuote);
    zenQuote = newQuote;
  }

  function resetGarden() {
    window.location.reload();
  }

  let showAnimal = false;
  let animalType = 'butterfly';
  let animalKey = 0;
  let showBreath = false;
  let musicOn = false;
  let surpriseActive = false;
  let surpriseMsg = '';
  let surpriseTimeout;

  function randomAnimal() {
    const animals = ['butterfly', 'koi', 'bird'];
    animalType = animals[Math.floor(Math.random() * animals.length)];
    animalKey += 1;
    showAnimal = true;
    setTimeout(() => showAnimal = false, 3500);
  }

  function toggleMusic() {
    musicOn = !musicOn;
  }

  function showBreathingGuide() {
    showBreath = true;
    setTimeout(() => showBreath = false, 9000);
  }

  function surpriseMe() {
    const actions = [
      () => { randomAnimal(); surpriseMsg = 'A wild animal appears!'; },
      () => { showBreathingGuide(); surpriseMsg = 'Take a deep breath...'; },
      () => { surpriseMsg = '✨ Sparkles everywhere!'; surpriseActive = true; setTimeout(() => surpriseActive = false, 1500); }
    ];
    actions[Math.floor(Math.random() * actions.length)]();
    clearTimeout(surpriseTimeout);
    surpriseTimeout = setTimeout(() => surpriseMsg = '', 2000);
  }

  onMount(() => {
    setInterval(() => {
      if (window.innerWidth < 640) return;
      if (Math.random() < 0.18) randomAnimal();
    }, 12000);
  });
</script>

<div class="zen-garden-bg fixed inset-0 -z-10">
  {#each particles as p, i}
    <div class="absolute rounded-full {p.color} blur-xl animate-float-particle pointer-events-none"
      style="left: {p.x}vw; top: {p.y}vh; width: {p.size}px; height: {p.size}px; animation-delay: {p.delay}s; animation-duration: {10 + p.size / 6}s;"></div>
  {/each}
</div>
<div class="zen-garden-container min-h-screen flex flex-col items-center justify-center py-6 px-2 sm:px-4 md:px-8">
  <header class="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-2 md:gap-4 relative">
    <div class="flex flex-col items-center w-full">
      <span class="text-base md:text-lg text-blue-100 italic bg-blue-900/60 px-2 md:px-3 py-1 rounded-xl backdrop-blur border border-blue-200/40 shadow-lg text-center w-full max-w-xl">
        "{zenQuote}"
      </span>
      <button on:click={refreshQuote} class="mt-2 px-3 py-1 bg-blue-400/80 text-white rounded shadow transition-all duration-300 hover:bg-blue-500/90 focus:outline-none text-xs backdrop-blur">
        New Quote
      </button>
      <div class="flex gap-0.5 md:gap-1 mt-2 md:mt-3 h-2 md:h-3">
        {#each Array(12) as _, i}
          <div class="w-0.5 md:w-1 rounded-full bg-blue-300/60 animate-soundwave" style="animation-delay: {i * 0.12}s"></div>
        {/each}
      </div>
    </div>
  </header>
  <div class="relative w-full max-w-6xl mx-auto">
    <div class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-900/80 via-blue-950/60 to-gray-900/80 blur-2xl opacity-90 pointer-events-none z-0 animate-gradient-move border-2 md:border-4 border-blue-400/30 animate-border-glow"></div>
    <div class="relative zen-shadow-lg rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 bg-blue-950/80 backdrop-blur-2xl border border-blue-200/40 shadow-2xl">
      <SandArea />
      {#each stones as stone (stone.id)}
        <div 
          class="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          style="left: {stone.x}; top: {stone.y};"
        >
          <Stone 
            size={stone.size} 
            sound={stone.sound}
          />
        </div>
      {/each}
      {#each plants as plant (plant.id)}
        <div 
          class="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          style="left: {plant.x}; top: {plant.y};"
        >
          <Plant 
            type={plant.type} 
            sound={plant.sound}
          />
        </div>
      {/each}
      <img src="/grass.png" alt="grass" class="absolute left-1/2 -translate-x-1/2 bottom-0 z-0 select-none pointer-events-none animate-grass-sway" style="width: 100vw; max-width: 420px; height: auto; opacity: 0.85; filter: blur(0.5px);" />
    </div>
  </div>
  <div class="fixed bottom-4 right-4 flex flex-col gap-2 md:gap-4 z-50">
    <button on:click={toggleMusic} class="glass rounded-full p-2 md:p-3 shadow-lg bg-gradient-to-br from-green-400/60 to-blue-500/60 text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur border border-green-200/40">
      {#if musicOn}
        <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      {:else}
        <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-2v13"/><circle cx="6" cy="18" r="3"/></svg>
      {/if}
    </button>
    <button on:click={showBreathingGuide} class="glass rounded-full p-2 md:p-3 shadow-lg bg-gradient-to-br from-blue-400/60 to-pink-500/60 text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur border border-blue-200/40">
      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/></svg>
    </button>
    <button on:click={surpriseMe} class="glass rounded-full p-2 md:p-3 shadow-lg bg-gradient-to-br from-yellow-400/60 to-pink-500/60 text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur border border-yellow-200/40">
      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    </button>
  </div>
  {#if showAnimal}
    {#if animalType === 'butterfly'}
      <div key={animalKey} class="fixed z-40 animate-butterfly pointer-events-none" style="left: 10vw; top: 60vh;">
        <svg width="36" height="36" viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="8" ry="16" fill="#fbbf24" opacity=".7"/><ellipse cx="24" cy="24" rx="16" ry="8" fill="#f472b6" opacity=".5"/><circle cx="24" cy="24" r="4" fill="#78350f"/></svg>
      </div>
    {:else if animalType === 'koi'}
      <div key={animalKey} class="fixed z-40 animate-koi pointer-events-none" style="left: 80vw; top: 70vh;">
        <svg width="36" height="18" viewBox="0 0 48 24"><ellipse cx="24" cy="12" rx="18" ry="8" fill="#fbbf24" opacity=".7"/><ellipse cx="24" cy="12" rx="8" ry="8" fill="#fff" opacity=".8"/><ellipse cx="34" cy="12" rx="4" ry="4" fill="#ef4444" opacity=".7"/></svg>
      </div>
    {:else if animalType === 'bird'}
      <div key={animalKey} class="fixed z-40 animate-bird pointer-events-none" style="left: 50vw; top: 10vh;">
        <svg width="36" height="24" viewBox="0 0 48 32"><ellipse cx="24" cy="24" rx="12" ry="8" fill="#60a5fa" opacity=".7"/><ellipse cx="34" cy="20" rx="6" ry="3" fill="#fbbf24" opacity=".8"/><ellipse cx="14" cy="20" rx="6" ry="3" fill="#fbbf24" opacity=".8"/></svg>
      </div>
    {/if}
  {/if}
  {#if showBreath}
    <div class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div class="breath-circle bg-blue-400/30 border-4 border-blue-200/40 rounded-full animate-breathing-guide"></div>
      <span class="absolute text-lg md:text-2xl text-blue-100 font-semibold animate-breath-text">Breathe In... Out...</span>
    </div>
  {/if}
  {#if surpriseActive}
    <div class="pointer-events-none fixed inset-0 z-50">
      {#each Array(24) as _, i}
        <div class="absolute bg-yellow-300/80 rounded-full animate-surprise-sparkle" style="left: {Math.random()*100}vw; top: {Math.random()*100}vh; width: 10px; height: 10px; animation-delay: {i*0.07}s"></div>
      {/each}
    </div>
  {/if}
  {#if surpriseMsg}
    <div class="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-900/90 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-xl text-base md:text-lg font-semibold animate-fade-in">
      {surpriseMsg}
    </div>
  {/if}
</div>

<style>
  .zen-garden-bg {
    background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
    animation: gradientBG 16s ease-in-out infinite alternate;
  }
  @keyframes gradientBG {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(30deg); }
  }
  .animate-gradient-move {
    animation: gradientMove 12s ease-in-out infinite alternate;
  }
  @keyframes gradientMove {
    0% { transform: scale(1) translateY(0); }
    100% { transform: scale(1.05) translateY(10px); }
  }
  .zen-garden-container {
    position: relative;
    width: 100%;
    background: transparent;
  }
  .animate-float-particle {
    animation: floatParticle 14s ease-in-out infinite alternate;
  }
  @keyframes floatParticle {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-30px) scale(1.1); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0.7; }
  }
  .animate-soundwave > div {
    animation: soundWave 1.2s infinite linear;
  }
  @keyframes soundWave {
    0%, 100% { height: 0.5rem; }
    50% { height: 1.5rem; }
  }
  .animate-border-glow {
    animation: borderGlow 3s ease-in-out infinite alternate;
  }
  @keyframes borderGlow {
    0% { box-shadow: 0 0 24px 0 #60a5fa44, 0 0 0 0 #f472b644; }
    100% { box-shadow: 0 0 48px 8px #60a5fa88, 0 0 0 8px #f472b688; }
  }
  .animate-grass-sway {
    animation: grassSway 6s ease-in-out infinite alternate;
    transform-origin: bottom center;
  }
  @keyframes grassSway {
    0% { transform: translateX(-50%) rotate(-2deg); }
    100% { transform: translateX(-50%) rotate(2deg); }
  }
  .animate-butterfly {
    animation: butterflyFly 3.5s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes butterflyFly {
    0% { transform: translateY(0) scale(1) rotate(-10deg); }
    40% { transform: translateY(-60px) scale(1.1) rotate(10deg); }
    80% { transform: translateY(-20px) scale(1.05) rotate(-8deg); }
    100% { transform: translateY(0) scale(1) rotate(0deg); }
  }
  .animate-koi {
    animation: koiSwim 3.5s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes koiSwim {
    0% { transform: translateX(0) scale(1); }
    50% { transform: translateX(-120px) scale(1.1); }
    100% { transform: translateX(0) scale(1); }
  }
  .animate-bird {
    animation: birdFly 3.5s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes birdFly {
    0% { transform: translateY(0) scale(1) rotate(-10deg); }
    40% { transform: translateY(-80px) scale(1.1) rotate(10deg); }
    80% { transform: translateY(-30px) scale(1.05) rotate(-8deg); }
    100% { transform: translateY(0) scale(1) rotate(0deg); }
  }
  .breath-circle {
    width: 120px;
    height: 120px;
    opacity: 0.7;
    filter: blur(2px);
  }
  @media (min-width: 768px) {
    .breath-circle { width: 180px; height: 180px; }
  }
  .animate-breathing-guide {
    animation: breathGuide 9s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes breathGuide {
    0%, 100% { transform: scale(0.7); opacity: 0.5; }
    20% { transform: scale(1.1); opacity: 0.8; }
    60% { transform: scale(1.2); opacity: 0.9; }
    80% { transform: scale(0.8); opacity: 0.7; }
  }
  .animate-breath-text {
    animation: breathText 9s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes breathText {
    0%, 100% { opacity: 0; }
    10%, 90% { opacity: 1; }
  }
  .animate-surprise-sparkle {
    animation: sparklePop 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes sparklePop {
    0% { transform: scale(0.5); opacity: 0.7; }
    60% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(0.7); opacity: 0; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>