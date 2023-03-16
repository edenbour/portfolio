<script setup>

defineProps({
    image: { String },
    tags: { Array, default: ["ui", "ux"] },
    nom: { String, default: "qantic" },
    id: String
})
</script>

<template>
    <RouterLink :to="'/project/' + id"
        class="h-96 lg:h-[28rem] cursor-pointer  flex flex-col items-center justify-center relative w-full hover:bg-hover transition-all duration-1000 overflow-hidden bg-fixed bg-center"
        :style="{ backgroundImage: `url(${image})` }">
        <div class="z-10 bg-black bg-opacity-70 flex flex-col items-center justify-center relative w-full h-full gap-10">
            <div class="marquee text-5xl md:text-7xl lg:text-9xl uppercase ">
                <h3 class="flex gap-24">{{ nom }}</h3>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
                <span aria-hidden class="ml-10 md:ml-20 uppercase">{{ nom }}</span>
            </div>
            <div class="flex gap-4 text-xs md:text-base flex-wrap justify-center">
                <p v-for="tag in tags"
                    class="px-4 py-2 border border-white rounded-full leading-none uppercase font-helveticaNeueThin">{{ tag
                    }}
                </p>
            </div>
        </div>
    </RouterLink>
</template>
<style scoped>
.wrapper {
    max-width: 100%;
    overflow: hidden;
}

.marquee {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    animation: marquee 60s linear infinite;
}

.marquee h3,
.marquee span {
    display: inline-block;
}

@keyframes marquee {
    0% {
        transform: translate3d(0, 0, 0);
    }

    100% {
        transform: translate3d(-40%, 0, 0);
    }
}</style>