<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

let mail = ref()
let password = ref()
const login = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, mail.value, password.value)
}


</script>


<template>
    <form class="flex flex-col w-4/5 md:w-1/2 mx-auto gap-9 mt-10 text-black">
        <input type="email" placeholder="Email" class="h-10 rounded-full px-4" v-model="mail">
        <input type="password" placeholder="Password" class="h-10 rounded-full px-4" v-model="password">
        <button class="bg-blue-300 h-10 rounded-full" @click.prevent="login">Se connecter</button>
    </form>
</template>