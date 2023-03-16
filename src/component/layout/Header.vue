<script setup>
import { onMounted, ref } from 'vue';

var prevScrollpos = window.pageYOffset;

/* Get the header element and it's position */
var headerDiv = ref()
var headerBottom = ref()
onMounted(() => {
    headerDiv.value = document.querySelector("header");
    headerBottom.value = headerDiv.value.offsetTop + headerDiv.value.offsetHeight;
})

window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    /* if we're scrolling up, or we haven't passed the header,
       show the header at the top */
    if (prevScrollpos > currentScrollPos || currentScrollPos < headerBottom.value) {
        headerDiv.value.style.top = "0";
    }
    else {
        /* otherwise we're scrolling down & have passed the header so hide it */
        headerDiv.value.style.top = "-7.2rem";
    }


    prevScrollpos = currentScrollPos;
}
</script>
<template>
    <header class="text-white py-3 border-b mx-3 px-3 flex justify-between items-center fixed top-0 left-0 right-0">
        <RouterLink to="/" class="hover__effect relative z-10 cursor-pointer">eden</RouterLink>
        <div class="flex gap-4 uppercase text-xs md:text-base items-center">
            <RouterLink to="/Project" class="hover__effect relative z-10 cursor-pointer">All Projects</RouterLink>
            <RouterLink to="/Logos" class="hover__effect relative z-10 cursor-pointer">All Logos</RouterLink>
        </div>
    </header>
</template>
<style>

</style>