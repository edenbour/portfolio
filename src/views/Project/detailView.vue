<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as fref } from '@firebase/storage';
let router = useRouter()
let id = router.currentRoute.value.params.id
// console.log(id)
let projet = ref({ nom: '', desc: '' })
onMounted(async () => {
    const db = getFirestore()
    const docRef = doc(db, "projets", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        projet.value = docSnap.data()
        projet.value.softwares = docSnap.data().softwares.join(', ')
        const storage = getStorage();
        for (let j = 0; j < projet.value.images.length; j++) {
            const spaceRef = fref(storage, projet.value.images[j]);
            await getDownloadURL(spaceRef)
                .then((url) => {
                    projet.value.images[j] = url;
                })
        }
        const spaceRef = fref(storage, projet.value.imagePres);
        await getDownloadURL(spaceRef)
            .then((url) => {
                projet.value.imagePres = url;
            })
        // console.log(projet.value)
        var images = document.querySelectorAll('.image');
        new simpleParallax(images, {
            scale: 1.2
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        router.push('/')
    }
})
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-5xl md:text-9xl uppercase py-10">{{ projet.nom }}</h1>
        <div class="pb-10 border-b">
            <img :src="projet.imagePres" alt="" class="image">

        </div>
        <div class="border-l max-w-xs flex flex-col gap-2 pl-2 mt-10 ">
            <p class="normal-case">{{ projet.softwares }}</p>
            <p>{{ projet.year }}</p>
        </div>
        <div class="w-11/12 flex flex-col font-helveticaNeueThin">
            <div class="flex gap-2 self-end">
                <p v-for="tag in projet.tags" class="px-2 py-[2px] text-xs md:text-base rounded-full border">{{ tag }}</p>
            </div>
            <p v-for="para in projet.desc.split('\\n')" class="text-end text-xs md:text-base uppercase mt-2 w-1/2 ml-auto">
                {{ para }}</p>
            <div class="flex items-center self-end gap-4">
                <img src="/Flower.svg" alt="" class="object-contain h-8">
                <img src="/sun.svg" alt="" class="object-contain h-8">
            </div>
        </div>
        <div v-for="image in projet.images" class="mt-16">
            <img :src="image" alt="" class="image">
        </div>
        <RouterLink to="/project"
            class="flex w-fit gap-4 text-2xl md:text-6xl items-center self-end pr-10 pt-8 mb-10 uppercase cursor-pointer">
            <img src="/ArrowBack.png" alt="" class="h-9 md:h-auto"> Back to projects
        </RouterLink>
    </div>
</template>