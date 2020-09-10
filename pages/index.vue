<template>
<div class="container">
    <template v-if="authenticated">
        <h2>Home Page Welcome again {{user.name}}</h2>
    </template>
    <template v-else>
        <h1>Welcome to the admins dashboard, please login</h1>
    </template>
</div>
</template>

<script>
export default {
    
}
</script>
