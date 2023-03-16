<script setup>
import { ref, onMounted } from 'vue';
import Footer from './component/layout/Footer.vue';
import Header from './component/layout/Header.vue';
const cursor = ref(null)
const hoverTarget = ref(null)
onMounted(() => {
  cursor.value.focus()

})
const positionElement = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  cursor.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}

window.addEventListener('mousemove', positionElement)
</script>
<template>
  <Header />
  <main class="text-white min-h-screen mx-3 pt-12">
    <span ref="cursor" id="cursor"></span>
    <RouterView />
  </main>
  <Footer />
</template>