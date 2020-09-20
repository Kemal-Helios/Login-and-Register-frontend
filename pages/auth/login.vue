<template>
<div class="container grid mt-cust">
    <template v-for="error in errors">
        <div class="notif-error">
            {{openNotification('top-left', 'warn',error[0])}}
        </div>
    </template>
    <vs-row align="center" justify="center">

        <vs-col w="8">
            <vs-card type="3">
                <template #title>
                    <h3>Login</h3>
                </template>
                <template #text>
                    <form>
                        <div class="center content-inputs">
                            <vs-input type="email" v-model="email" label="" placeholder="exe@gmail.com">
                                <template v-if="validEmail" #message-success>
                                    Email Valid
                                </template>
                                <template v-if="!validEmail && email !== ''" #message-danger>
                                    Email Invalid
                                </template>
                            </vs-input>
                        </div>
                        <template>
                            <div class="center content-inputs">
                                <vs-input type="password" v-model="password" placeholder="Password" label-placeholder="" :visiblePassword="hasVisiblePassword" icon-after @click-icon="hasVisiblePassword = !hasVisiblePassword" autocomplete="password">
                                    <template #icon>
                                        <i v-if="!hasVisiblePassword" class='bx bx-show-alt'></i>
                                        <i v-else class='bx bx-hide'></i>
                                    </template>

                                </vs-input>
                            </div>

                        </template>
                        <vs-button @click.prevent="login">
                            <span>
                                <i class='bx bx-log-in'></i>
                                Login
                            </span>
                        </vs-button>
                    </form>

                </template>

            </vs-card>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
export default {
    middleware: 'guest',
    data: () => ({
        email: '',
        password: '',
        hasVisiblePassword: false,
    }),
    computed: {
        validEmail() {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        }
    },
    mounted() {},
    methods: {
        async login() {
            let formData = {
                email: this.email,
                password: this.password
            }
            this.$auth.login({
                data: formData
            }).then((res) => {
                this.$router.push(
                    this.$route.query.redirect ? this.$route.query.redirect : '/dashboard'
                );
            });
        },
        openNotification(position = null, color, errors) {
            const noti = this.$vs.notification({
                duration: 9000,
                color,
                position,
                title: "<i class='bx bx-error '></i> " + ' ' +
                    errors,
            })
        }
    }
}
</script>

<style>
.mt-cust {
    margin-top: 10rem
}

h3 {
    padding: 0.75rem
}

.content-inputs {
    margin: 0.5rem auto;

}

.vs-input {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
}

.vs-card__text {
    width: 25rem;
}
</style>
