<script setup>
import { collection, getDocs, getFirestore, query } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref as fref } from '@firebase/storage';
import { onMounted, ref } from 'vue';
let data = ref([])
onMounted(async () => {
    const firestore = getFirestore()
    let q = query(collection(firestore, "logos"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.value.push({ id: doc.id, ...doc.data() })
    });
    for (let i = 0; i < data.value.length; i++) {
        const storage = getStorage();
        const spaceRef = fref(storage, data.value[i].image);
        await getDownloadURL(spaceRef)
            .then((url) => {
                data.value[i].image = url;
            })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // console.log(data.value)
})
</script>
<template>
    <div class="border-b pb-16">
        <h1 class="uppercase text-4xl md:text-6xl lg:text-8xl xl:text-9xl w-1/3 pt-4">All my Logos</h1>
        <div class="flex items-center justify-end gap-4 -mt-5 -mb-5">
            <img src="/Flower.svg" alt="" class="object-contain h-5 md:h-12">
            <img src="/sun.svg" alt="" class="object-contain h-5 md:h-12">
        </div>
        <div v-for="logo in data" class="w-full h-[28rem] border-t mt-10 flex justify-center flex-wrap gap-9 py-8">
            <div class="flex flex-col w-1/2 justify-center text-center md:text-left md:justify-end">
                <h2 class="text-5xl lg:text-6xl xl:text-7xl uppercase ">{{ logo.nom }}</h2>
            </div>
            <div class="w-full h-72 md:h-auto md:w-2/5">
                <img :src="logo.image" alt="" class="object-contain w-full h-full">
            </div>
        </div>
    </div>
</template>