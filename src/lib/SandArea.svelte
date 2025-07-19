<script>
  import { onMount } from 'svelte'
  
  let canvas
  let ctx
  let isDrawing = false
  let lastX = 0
  let lastY = 0
  
  function startDrawing(e) {
    isDrawing = true
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    if (e.type === 'touchstart') {
      lastX = (e.touches[0].clientX - rect.left) * scaleX
      lastY = (e.touches[0].clientY - rect.top) * scaleY
    } else {
      lastX = (e.clientX - rect.left) * scaleX
      lastY = (e.clientY - rect.top) * scaleY
    }
  }
  
  function draw(e) {
    if (!isDrawing) return
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    let currentX, currentY
    
    if (e.type === 'touchmove') {
      e.preventDefault()
      currentX = (e.touches[0].clientX - rect.left) * scaleX
      currentY = (e.touches[0].clientY - rect.top) * scaleY
    } else {
      currentX = (e.clientX - rect.left) * scaleX
      currentY = (e.clientY - rect.top) * scaleY
    }
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(currentX, currentY)
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.stroke()
    
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      ctx.moveTo(lastX + i * 3, lastY)
      ctx.lineTo(currentX + i * 3, currentY)
      ctx.strokeStyle = 'rgba(0,0,0,0.1)'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    
    lastX = currentX
    lastY = currentY
  }
  
  function stopDrawing() {
    isDrawing = false
  }
  
  function resetSand() {
    drawSandTexture()
  }
  
  function drawSandTexture() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#faf0e0')
    gradient.addColorStop(0.5, '#f4e0c1')
    gradient.addColorStop(1, '#ebcb96')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.globalCompositeOperation = 'multiply'
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2
      
      ctx.fillStyle = `rgba(${139 + Math.random() * 30}, ${119 + Math.random() * 20}, ${101 + Math.random() * 20}, 0.3)`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.globalCompositeOperation = 'source-over'
  }
  
  function resizeCanvas() {
    const container = canvas.parentElement
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    drawSandTexture()
  }
  
  onMount(() => {
    ctx = canvas.getContext('2d')
    resizeCanvas()
    
    window.addEventListener('resize', resizeCanvas)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  })
</script>

<div class="sand-container relative bg-sand-100 aspect-[16/10] md:aspect-[20/12]">
  <canvas
    bind:this={canvas}
    class="absolute inset-0 w-full h-full cursor-crosshair touch-none"
    on:mousedown={startDrawing}
    on:mousemove={draw}
    on:mouseup={stopDrawing}
    on:mouseleave={stopDrawing}
    on:touchstart={startDrawing}
    on:touchmove={draw}
    on:touchend={stopDrawing}
  ></canvas>
  
  <button
    on:click={resetSand}
    class="absolute top-4 right-4 bg-stone-100/80 hover:bg-stone-200/80 text-stone-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 zen-shadow backdrop-blur-sm"
  >
    Reset Sand
  </button>
  
  <div class="absolute bottom-4 left-4 text-stone-400 text-sm bg-white/60 px-3 py-2 rounded-full backdrop-blur-sm">
    Draw to create patterns
  </div>
</div>

<style>
  .sand-container {
    min-height: 300px;
  }
  
  @media (max-width: 768px) {
    .sand-container {
      min-height: 250px;
    }
  }
</style>