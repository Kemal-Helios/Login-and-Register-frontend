<template>
<div class="container grid mt-cust">
    <template v-for="error in errors">
        <div class="notif-error">
            {{openNotification('top-left', 'warn',error[0])}}
        </div>
    </template>
    <template v-if="success">
        <div class="notif-error">
            {{openNotification('top-left', 'success',success)}}
        </div>
    </template>
    <vs-row align="center" justify="center">
        <vs-col w="7">
            <vs-card type="3">
                <template #title>
                    <h3>Add New User</h3>
                </template>
                <template #text>
                    <form>
                        <template>
                            <div class=" center content-inputs">
                                <vs-input type="text" v-model="name" placeholder="Name" autocomplete="name" />
                            </div>
                        </template>
                        <template>
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
                        </template>
                        <template>
                            <div class=" center content-inputs">
                                <vs-input type="text" v-model="country_code" placeholder="country code" />
                            </div>
                        </template>
                        <template>
                            <div class=" center content-inputs">
                                <vs-input type="text" v-model="mobile" placeholder="Mobile" autocomplete="mobile" />
                            </div>
                        </template>
                        <template>
                            <div class=" center content-inputs">
                                <vs-input type="text" v-model="discount_code" placeholder="discount code" />
                            </div>
                        </template>
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
                        <template>
                            <div class=" center content-inputs">
                                <vs-select placeholder="Status" v-model="status" class="my-3">
                                    <vs-option label="Active" value="Active">
                                        Active
                                    </vs-option>
                                    <vs-option label="Inactive" value="Inactive">
                                        Inactive
                                    </vs-option>
                                </vs-select>
                            </div>
                        </template>

                        <template>
                            <div class="center content-inputs">
                                <vs-select placeholder="Role" v-model="role">
                                    <vs-option label="Observer" value="observer">
                                        Observer
                                    </vs-option>
                                    <vs-option label="Delegate" value="delegate">
                                        Delegate
                                    </vs-option>
                                    <vs-option label="Client" value="client">
                                        Client
                                    </vs-option>
                                </vs-select>
                            </div>
                        </template>

                        <vs-button @click.prevent="register" class="mt-4">
                            <span>
                                <i class='bx bx-log-in'></i>
                                addition
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
        mobile: '',
        password: '',
        country_code: '',
        mobile: '',
        discount_code: '',
        status: '',
        role: '',
        success: '',
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

            let url = '/add/user';
            let formData = {
                name: this.name,
                email: this.email,
                country_code: this.country_code,
                mobile: this.mobile,
                discount_code: this.discount_code,
                status: this.status,
                role: this.role,
                password: this.password
            }
            this.$axios.post(url, formData, config).then((res) => {
                if (res.data.status == true) {
                    this.success = res.data.msg,
                        this.name = '',
                        this.email = '',
                        this.country_code = '',
                        this.mobile = '',
                        this.discount_code = '',
                        this.status = '',
                        this.role = '',
                        this.password = ''

                }

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
        },
        openNotification(position = null, color, success) {
            const noti = this.$vs.notification({
                duration: 9000,
                color,
                position,
                title: "<i class='bx bx-check' ></i> " + ' ' +
                    success,
            })
        }
    }
}
</script>

<style>
.vs-card-content.type-3 .vs-card:hover {
    -webkit-transform: none;
    transform: none;
}

.vs-select-content {
    max-width: 368px;
}

.mt-cust {
    margin-top: 3rem
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
