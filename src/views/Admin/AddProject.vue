<script setup>
import login from '@/component/admin/login.vue'
import project from '@/component/admin/project.vue'
import { user } from '../../firebase';
</script>

<template>
    <login v-if="!user" />
    <project v-else />
</template>