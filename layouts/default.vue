<template>
<div>

    <div class="container-fluid">
        <TopNav />
        <div class="row">
            <div class="d-none d-md-block col-md-3">
                <Sidebar />
            </div>
            <div class="col-12 col-md-9">
                <Nuxt />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from './partials/Sidebar'
import TopNav from './partials/TopNav'
export default {
    components: {
        TopNav,
        Sidebar
    }

}
</script>

<style>

</style>
