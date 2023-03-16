<script setup>
import login from '@/component/admin/login.vue'
import logo from '@/component/admin/logo.vue'
import { user } from '../../firebase';
</script>

<template>
    <login v-if="!user" />
    <logo v-else />
</template>