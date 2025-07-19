<script>
  import ZenGarden from './lib/ZenGarden.svelte'
  import AudioControls from './lib/AudioControls.svelte'
  import { audioManager } from './lib/audioManager.js'
  import { onMount } from 'svelte'

  onMount(() => {
    audioManager.init()
  })
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 font-zen">
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-light text-stone-700 mb-4 tracking-wide">
        Zen Garden
      </h1>
      <p class="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
        Find peace through interaction. Touch the elements to discover hidden sounds of nature.
      </p>
    </header>
    <div class="flex justify-center mb-8">
      <AudioControls />
    </div>
    <ZenGarden />
    <footer class="text-center mt-12 text-stone-400 text-sm">
      <p>Click stones for water sounds • Hover plants for nature sounds • Draw in the sand to create patterns</p>
    <p class="mt-2">
      Made with <span class="text-red-500">❤️</span> by
      <a
        href="https://github.com/leecheeyong"
        target="_blank"
        class="text-gray-700 hover:underline"
      >
        Chee Yong Lee
      </a>
    </p>
    <p class="mt-1">
      Project available as open source under the terms of
      <a
        href="https://github.com/leecheeyong/ZenGarden/blob/main/LICENSE"
        target="_blank"
        class="text-gray-700 hover:underline"
        >MIT License</a
      >
    </p>
    </footer>
  </div>
</main>