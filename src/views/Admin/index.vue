<script setup>
import login from '@/component/admin/login.vue'
import tableProjet from '@/component/admin/tableProjet.vue'
import TableLogo from '../../component/admin/tableLogo.vue';
import { user } from '../../firebase';
</script>

<template>
    <login v-if="!user" />
    <div v-else>
        <tableProjet />
        <TableLogo />
    </div>
</template>