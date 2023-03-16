<script setup>
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getStorage, ref as fref, uploadString } from '@firebase/storage';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const imagesData = ref([])
const imagePresData = ref()
const desc = ref()
const softwares = ref()
const year = ref()
const nom = ref()
const link = ref()
const tags = ref()

const SetImagesData = (e) => {
    const files = e.target.files
    let images = []
    for (let i = 0; i < files.length; i++) {
        var reader = new FileReader()
        reader.onload = (e) => {
            images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
    }
    imagesData.value = images
}
const SetImagePresData = (e) => {
    const files = e.target.files
    var reader = new FileReader()
    reader.onload = (e) => {
        imagePresData.value = e.target.result
    }
    reader.readAsDataURL(files[0])
}


const upload = async () => {
    let imagesPath = []
    let imagePresPath = null
    const storage = getStorage()
    let i = 0
    for (let i = 0; i < imagesData.value.length; i++) {
        const refStorage = fref(storage, `${nom.value}/` + nom.value + i)
        await uploadString(refStorage, imagesData.value[i], 'data_url').then((snapshot) => {
            imagesPath.push(snapshot.metadata.fullPath)
        })
    }
    const refStorage = fref(storage, `${nom.value}/` + nom.value + 'Pres')
    await uploadString(refStorage, imagePresData.value, 'data_url').then((snapshot) => {
        imagePresPath = snapshot.metadata.fullPath
    })
    let projet = {
        images: imagesPath,
        imagePres: imagePresPath,
        desc: desc.value.replace("\n", "\\n"),
        nom: nom.value,
        softwares: softwares.value.split('\n'),
        year: year.value,
        tags: tags.value.split('\n'),
        link: link.value
    }
    const db = getFirestore();
    const docRef = await addDoc(collection(db, 'projets'), projet);
    router.push('/admin')
}

</script>
<template>
    <form class="flex flex-col w-4/5 md:w-1/2 mt-10 mx-auto gap-4">
        <label>Titre : </label>
        <input required class="text-black" type="text" v-model="nom">
        <label>Link : </label>
        <input required class="text-black" type="text" v-model="link">
        <label>Softwares : </label>
        <textarea required class="text-black" v-model="softwares"></textarea>
        <label>Année : </label>
        <input required class="text-black" type="number" v-model="year">
        <label>Description : </label>
        <textarea required class="text-black" v-model="desc"></textarea>
        <label>Tags : </label>
        <textarea required class="text-black" v-model="tags"></textarea>
        <label>Images :</label>
        <input required type="file" accept='image/png,image/jpeg,image/webp,image/gif' multiple @change="SetImagesData">
        <label>Image Pres :</label>
        <input required type="file" accept='image/png,image/jpeg,image/webp,image/gif'  @change="SetImagePresData">
        <button class="bg-blue-300 h-10 rounded-full" @click.prevent="upload">Ajouter</button>
    </form>
</template>