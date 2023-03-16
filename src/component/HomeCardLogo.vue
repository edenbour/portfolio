<script setup>
import { ref } from 'vue';


defineProps({
    image: String,
    num: String,
    smallDesc: String,
    largeDesc: String,
    id: String
})
let show = ref(false)
</script>

<template>
    <div class="flex flex-col max-w-sm font-helveticaNeueThin uppercase">
        <div class="text-white border-l-2 h-60 gap-12 flex justify-between relative">
            <div class="flex flex-col justify-between pl-4 ">
                <p class="text-2xl font-helveticaNeue">{{ num }}</p>
                <div class="h-32">
                    <img :src="image" alt="" class="h-full w-full object-contain">
                </div>
            </div>
            <div class="w-1/2">
                <p class="text-end">{{ smallDesc }}</p>
            </div>
            <div class="absolute top-[90%] right-0 text-2xl hover:text-3xl cursor-pointer" @click="show = !show" v-if="!show">+</div>
            <div class="absolute top-[90%] right-0 text-2xl hover:text-3xl cursor-pointer" @click="show = !show" v-if="show">-</div>
        </div>
        <div v-if="show" class="max-w-lg py-3 border-b-2">{{ largeDesc }}</div>
    </div>
</template>