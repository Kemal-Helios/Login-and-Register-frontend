<template>
<div>
    <vs-row align="center" justify="center">
        <vs-col w="12">
            <TopNav />
        </vs-col>
    </vs-row>
    <vs-row align="center" justify="center" class="container">
        <vs-col w="12">
            <Nuxt />
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import TopNav from './partials/TopNav'
export default {
    components: {
        TopNav
    }

}
</script>

<style>

</style>
