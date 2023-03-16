<script setup>
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getStorage, ref as fref, uploadString } from '@firebase/storage';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const imagesData = ref()
const num = ref()
const nom = ref()
const largeDesc = ref()
const smallDesc = ref()

const SetImagesData = (e) => {
    const files = e.target.files
    var reader = new FileReader()
    reader.onload = (e) => {
        imagesData.value = e.target.result
    }
    reader.readAsDataURL(files[0])

}


const upload = async () => {
    let imagesPath = []
    const storage = getStorage()
    const refStorage = fref(storage, 'logos/' + num.value)
    await uploadString(refStorage, imagesData.value, 'data_url').then((snapshot) => {
        imagesPath = snapshot.metadata.fullPath
    })
    let projet = {
        image: imagesPath,
        numero: num.value,
        nom: nom.value,
        largeDesc: largeDesc.value,
        smallDesc: smallDesc.value,
        IsHomepage: false
    }
    const db = getFirestore();
    const docRef = await addDoc(collection(db, 'logos'), projet);
    router.push('/admin')
}

</script>
<template>
    <form class="flex flex-col w-4/5 md:w-1/2 mt-10 mx-auto gap-4">
        <label>Nom : </label>
        <input required class="text-black" type="text" v-model="nom">
        <label>Numéro : </label>
        <input required class="text-black" type="text" v-model="num">
        <label>largeDesc : </label>
        <textarea required class="text-black" type="text" v-model="largeDesc"></textarea>
        <label>smallDesc : </label>
        <input required class="text-black" type="text" v-model="smallDesc">
        <label>logo :</label>
        <input required type="file" accept='image/png,image/jpeg,image/webp,image/gif' @change="SetImagesData">
        <button class="bg-blue-300 h-10 rounded-full" @click.prevent="upload">Ajouter</button>
    </form>
</template>