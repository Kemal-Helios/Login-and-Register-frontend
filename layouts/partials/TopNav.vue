<template>
<div class="nav-mar">
    <vs-navbar center-collapsed shadow>

        <template #left>
            <nuxt-link class="nav-link navbar-brand res-link" to="/">Raijin</nuxt-link>
        </template>
        <template #right>
            <template v-if="authenticated">
                <vs-navbar-item class="nav-item">
                    <nuxt-link class="nav-link res-link" to="/dashboard">Dashboard</nuxt-link>
                </vs-navbar-item>
                <vs-navbar-group>
                    Profile
                    <template #items class="nav-item">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item vs-navbar__item">{{user.name}}</li>
                            <li class="nav-item vs-navbar__item">{{user.email}}</li>
                            <button class="nav-item vs-navbar__item" @click.prevent="logout">logout</button>
                        </ul>
                    </template>
                </vs-navbar-group>
            </template>
            <template v-else>
                <vs-navbar-item class="nav-item">
                    <nuxt-link class="nav-link res-link" to="/auth/login">Login</nuxt-link>
                </vs-navbar-item>
            </template>
        </template>

    </vs-navbar>
</div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout();
        }
    }

}
</script>

<style>
.nav-mar {
    margin-bottom: 70px;
}

.vs-navbar__group__items {
    right: 0;
    left: auto;
}

.res-link,
.vs-navbar__group__item {
    color: #7f8c8d;
    outline: none;
    list-style: none;
}

.res-link:hover {
    color: #bdc3c7;
}

.navbar-brand {
    text-transform: uppercase;
    font-weight: 800;
}
</style>
