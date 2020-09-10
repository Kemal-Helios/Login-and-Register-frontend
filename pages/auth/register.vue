<template>
<div class="container grid">
    <template v-for="error in errors">
        <div class="notif-error">
            {{openNotification('top-left', 'warn',error[0])}}
        </div>
    </template>
    <vs-row align="center" justify="center">

        <vs-col w="6">
            <vs-card type="3">
                <template #title>
                    <h3>Register</h3>
                </template>
                <template #text>
                    <form>
                        <template>
                            <div class=" center content-inputs">
                                <vs-input type="text" v-model="name" placeholder="Name" autocomplete="name" />
                            </div>
                        </template>
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
                                <vs-input type="password" v-model="password" placeholder="Password" label-placeholder="" :progress="getProgress" :visiblePassword="hasVisiblePassword" icon-after @click-icon="hasVisiblePassword = !hasVisiblePassword" autocomplete="password">
                                    <template #icon>
                                        <i v-if="!hasVisiblePassword" class='bx bx-show-alt'></i>
                                        <i v-else class='bx bx-hide'></i>
                                    </template>

                                    <template v-if="getProgress >= 100" #message-success>
                                        Secure password
                                    </template>

                                </vs-input>
                            </div>

                        </template>
                        <vs-button @click.prevent="register">
                            <span>
                                <i class='bx bx-log-in'></i>
                                Register
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
    middleware: 'auth',
    data: () => ({
        name: '',
        email: '',
        password: '',
        hasVisiblePassword: false,
    }),
    computed: {
        validEmail() {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        },
        getProgress() {
            let progress = 0

            // at least one number

            if (/\d/.test(this.password)) {
                progress += 20
            }

            // at least one capital letter

            if (/(.*[A-Z].*)/.test(this.password)) {
                progress += 20
            }

            // at menons a lowercase

            if (/(.*[a-z].*)/.test(this.password)) {
                progress += 20
            }

            // more than 5 digits

            if (this.password.length >= 6) {
                progress += 20
            }

            // at least one special character

            if (/[^A-Za-z0-9]/.test(this.password)) {
                progress += 20
            }

            return progress
        }
    },
    mounted() {},
    methods: {
        async register() {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let url = '/auth/register';
            let formData = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$axios.post(url, formData, config).then((res) => {
                this.$auth.login({
                    data: formData
                });
                this.$router.push({
                    name: 'index'
                });
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
