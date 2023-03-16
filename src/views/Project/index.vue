<script setup>
import { collection, getDocs, getFirestore, query } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref as fref } from '@firebase/storage';
import { onMounted, ref } from 'vue';
let data = ref([])
onMounted(async () => {
    const firestore = getFirestore()
    let q = query(collection(firestore, "projets"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.value.push({ id: doc.id, ...doc.data() })
    });
    for (let i = 0; i < data.value.length; i++) {
        const storage = getStorage();
        const spaceRef = fref(storage, data.value[i].images[0]);
        await getDownloadURL(spaceRef)
            .then((url) => {
                data.value[i].images[0] = url;
            })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
</script>
<template>
    <div class="border-b pb-10">
        <h1 class="uppercase text-4xl md:text-6xl lg:text-8xl xl:text-9xl w-1/2 pt-4">All my projects</h1>
        <div class="flex items-center justify-end gap-4 -mt-5 -mb-5">
            <img src="/Flower.svg" alt="" class="object-contain h-5 md:h-12">
            <img src="/sun.svg" alt="" class="object-contain h-5 md:h-12">
        </div>
        <div v-for="projet in data" class="w-full h-[28rem] border-t mt-10 flex flex-wrap justify-between gap-9 py-8">
            <RouterLink :to="'/project/' + projet.id" class="flex flex-col w-1/2 md:justify-end gap-4 cursor-pointer">
                <div class="flex gap-2 text-xs md:text-base lg:text-lg">
                    <p v-for="tag in projet.tags"
                        class="px-2 py-[2px] uppercase flex items-center border rounded-full font-helveticaNeueThin">{{ tag
                        }}</p>
                </div>
                <h2 class="text-2xl md:text-5xl lg:text-6xl xl:text-7xl uppercase w-fit ">{{ projet.nom }}</h2>
            </RouterLink>
            <RouterLink :to="'/project/' + projet.id" class="w-full h-72 md:h-auto md:w-2/5 cursor-pointer overflow-hidden">
                <img :src="projet.images[0]" alt=""
                    class="object-cover w-full h-full hover:scale-125 transition-all duration-1000">
            </RouterLink>
        </div>
    </div>
</template>