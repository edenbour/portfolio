<script setup>
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { getStorage, getDownloadURL, deleteObject, ref as fref } from 'firebase/storage'
import { onMounted, ref } from "vue";
let data = ref([])
onMounted(async () => {
    const firestore = getFirestore()
    const querySnapshot = await getDocs(collection(firestore, "projets"));
    querySnapshot.forEach((doc) => {
        data.value.push({ id: doc.id, ...doc.data() })
    });
    for (let i = 0; i < data.value.length; i++) {
        const storage = getStorage();
        for (let j = 0; j < data.value[i].images.length; j++) {
            const spaceRef = fref(storage, data.value[i].images[j]);
            await getDownloadURL(spaceRef)
                .then((url) => {
                    data.value[i].images[j] = url;
                })
        }
    }
    for (let i = 0; i < data.value.length; i++) {
        const storage = getStorage();

        const spaceRef = fref(storage, data.value[i].imagePres);
        await getDownloadURL(spaceRef)
            .then((url) => {
                data.value[i].imagePres = url;
                // console.log(url)
            })

    }
})
const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
const removeproject = async (projet) => {
    if (window.confirm('Tu es sur le point de supprimer le projet ' + projet.nom)) {

        const firestore = getFirestore();
        await deleteDoc(doc(firestore, "projets", projet.id));
        const storage = getStorage();
        for (let i = 0; i < projet.images.length; i++) {
            let docRef = fref(storage, projet.images[i]);
            await deleteObject(docRef);
        }
        window.location.reload()
    }
}

const setIshomepage = async (id, value) => {
    const firestore = getFirestore();
    await updateDoc(doc(firestore, "projets", id), {
        IsHomepage: value
    })
}

</script>
<template>
    <div class="w-4/5 bg-gray-300 text-black flex mx-auto p-4 overflow-x-scroll mt-10">
        <button @click="logout" class="absolute top-3 right-10 text-white">Log out</button>

        <div class="flex flex-col">
            <h1 class="text-center text-2xl">Projet</h1>
            <RouterLink to="/admin/addP" class="mb-4 cursor-pointer">ajouter</RouterLink>
            <table className='mx-auto max-w-full'>
                <thead className='h-14'>
                    <tr>
                        <td className='border border-black w-28 text-center'>Nom</td>
                        <td className='border border-black w-28 text-center'>Softwares</td>
                        <td className='border border-black w-28 text-center'>Année</td>
                        <td className='border border-black w-28 text-center'>Tags</td>
                        <td className='border border-black w-28 text-center'>Description</td>
                        <td className='border border-black w-28 text-center'>Images</td>
                        <td className='border border-black w-28 text-center'>Pres</td>
                        <td className='border border-black w-28 text-center'>IsHomepage?</td>
                        <td className='border border-black w-28 text-center'>Edit</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="projet in data" :key="projet.id">
                        <td className='border border-black w-28 text-center'>{{ projet.nom }}</td>
                        <td className='border border-black w-28 text-center'>
                            <p v-for="software in projet.softwares">{{ software }}</p>
                        </td>
                        <td className='border border-black w-28 text-center'>{{ projet.year }}</td>
                        <td className='border border-black w-28 text-center'>
                            <p v-for="tag in projet.tags">{{ tag }}</p>
                        </td>
                        <td className='border border-black w-28 text-center'>
                            <p v-for="para in projet.desc.split('\\n')">{{ para }}</p>
                        </td>
                        <td className='border border-black w-28 text-center'>
                            <img v-for="image in projet.images" :src="image" :alt="'photo de ' + projet.nom">
                        </td>
                        <td className='border border-black w-28 text-center'>
                            <img :src="projet.imagePres" :alt="'photo de ' + projet.nom">
                        </td>
                        <td className='border border-black w-28 text-center'>
                            <input type="checkbox" v-model="projet.IsHomepage"
                                @change="setIshomepage(projet.id, projet.IsHomepage)" />
                        </td>
                        <td className='border border-black w-28 text-center'>
                            <button @click.prevent="removeproject(projet)">remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>