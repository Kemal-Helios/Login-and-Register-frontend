<template>
<div class="hidden side-bar-dash" v-if="authenticated">
    <vs-sidebar absolute open>
        <vs-sidebar-item class="nav-item">
            <template #icon>
                <i class='bx bx-home'></i>
            </template>
            <nuxt-link class="nav-link res-link" to="/dashboard">Dashboard</nuxt-link>
        </vs-sidebar-item>
        <vs-sidebar-group>
            <template #header>
                <vs-sidebar-item arrow>
                    <template #icon>
                        <i class='bx bx-group'></i>
                    </template>
                    Users
                </vs-sidebar-item>
            </template>
            <vs-sidebar-item class="nav-item">
                <template #icon>
                    <i class='bx bx-add-to-queue'></i>
                </template>
                <nuxt-link class="nav-link res-link" to="/auth/add_user">Add New User</nuxt-link>
            </vs-sidebar-item>
            <vs-sidebar-item class="nav-item">
                <template #icon>
                    <i class='bx bxs-user-rectangle'></i>
                </template>
                <nuxt-link class="nav-link res-link" to="/auth/users">Users Table</nuxt-link>
            </vs-sidebar-item>
        </vs-sidebar-group>

        <template #footer>
            <vs-row justify="space-between">
                <vs-avatar>
                    <!--<img src="/avatars/avatar-5.png" alt="">-->
                </vs-avatar>

                <vs-avatar badge-color="danger" badge-position="top-right">
                    <i class='bx bx-bell'></i>

                    <template #badge>
                        28
                    </template>
                </vs-avatar>
            </vs-row>
        </template>
    </vs-sidebar>
</div>
</template>

<script>
export default {
    middleware: 'auth',
}
</script>

<style>
.side-bar-dash {
    height: 90vh;
}

button:focus {
    outline: 0;
    outline: 0;
}

.vs-sidebar__item__arrow {
    margin-right: 35px;
}
</style>
