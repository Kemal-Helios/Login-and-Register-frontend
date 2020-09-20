<template>
<div class="center">
    <div class="container">
        <div class="row mt-5 mb-3 ">
            <h1 class="ml-3">USERS TABLE</h1>
        </div>

        <vs-table v-model="selected">
            <template #header>
                <vs-input border v-model="search" border placeholder="Search" />
            </template>
            <template #thead>
                <vs-tr>
                    <vs-th class="tr-td-size">
                        <vs-checkbox :indeterminate="selected.length == users.length" v-model="allCheck" @change="selected = $vs.checkAll(selected, users)" />
                    </vs-th>
                    <vs-th sort @click="users = $vs.sortData($event ,users, 'id')" class="tr-td-size">
                        Id
                    </vs-th>
                    <vs-th>
                        Name
                    </vs-th>
                    <vs-th>
                        Email
                    </vs-th>
                    <vs-th>
                        Country Code
                    </vs-th>
                    <vs-th>
                        Mobile
                    </vs-th>
                    <vs-th>
                        Discount Code
                    </vs-th>
                    <vs-th class="tr-td-size">
                        Status
                    </vs-th>
                    <vs-th>
                        Role
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(users, search), current_page, max)" :data="tr" :is-selected="!!selected.includes(tr)" not-click-selected open-expand-only-td>
                    <vs-td checkbox class="tr-td-size">
                        <vs-checkbox :val="tr" v-model="selected" />
                    </vs-td>
                    <vs-td class="tr-td-size">
                        {{ tr.id }}
                    </vs-td>
                    <vs-td>
                        {{ tr.name }}
                    </vs-td>
                    <vs-td>
                        {{ tr.email }}
                    </vs-td>
                    <vs-td>
                        {{tr.country_code}}
                    </vs-td>
                    <vs-td>
                        {{tr.mobile}}
                    </vs-td>
                    <vs-td>
                        {{tr.discount_code}}
                    </vs-td>
                    <vs-td class="tr-td-size">
                        {{tr.status}}
                    </vs-td>
                    <vs-td :key="r" v-for="(role, r) in tr.roles" :data="role">
                        {{role.name}}

                    </vs-td>
                    <template #expand>
                        <div class="con-content">
                            <vs-button flat icon @click.prevent="editActive=!editActive; userEdit(tr.id, tr.name, tr.email, tr.country_code, tr.mobile, tr.discount_code, tr.status, tr.roles[0].name)">
                                <i class='bx bx-edit-alt'></i>
                                Edit
                            </vs-button>

                        </div>
                    </template>
                </vs-tr>
            </template>

            <template #footer>
                <vs-pagination v-model=" current_page" :length="$vs.getLength($vs.getSearch(users, search), max)" />
            </template>
        </vs-table>
        <vs-dialog v-model="editActive">
            <template #header>
                <h3 class="mt-4">Edit User</h3>
            </template>
            <div class="center content-inputs">
                <form>
                    <vs-input v-model="id" type="hidden" />
                    <vs-input border v-model="name" placeholder="Name" class="mb-3" />
                    <vs-input border v-model="email" placeholder="Email" class="my-3" />
                    <vs-input border v-model="country_code" placeholder="Contry Code" class="my-3" />
                    <vs-input border v-model="mobile" placeholder="Mobile" class="my-3" />
                    <vs-input border v-model="discount_code" placeholder="Discount Code" class="my-3" />

                    <vs-select placeholder="Status" v-model="status" class="my-3">
                        <vs-option label="Active" value="Active">
                            Active
                        </vs-option>
                        <vs-option label="Inactive" value="Inactive">
                            Inactive
                        </vs-option>
                    </vs-select>

                    <vs-select placeholder="Role" v-model="role" class="my-3">
                        <vs-option label="Observer" value="Observer">
                            Observer
                        </vs-option>
                        <vs-option label="Delegate" value="Delegate">
                            Delegate
                        </vs-option>
                        <vs-option label="Client" value="Client">
                            Client
                        </vs-option>
                    </vs-select>

                    <div class="footer-dialog mt-3 mb-2">
                        <vs-button @click="userUpdate" block>
                            Update
                        </vs-button>
                        <vs-button block danger @click="userDelete">
                            Remove User
                        </vs-button>
                    </div>
                </form>
            </div>
        </vs-dialog>
    </div>
</div>
</template>

<script>
export default {
    middleware: 'auth',
    data: () => ({
        id: '',
        name: '',
        email: '',
        mobile: '',
        country_code: '',
        mobile: '',
        discount_code: '',
        status: '',
        role: '',
        editActive: false,
        edit: null,
        editProp: {},
        search: '',
        allCheck: false,
        current_page: 1,
        max: 9,
        active: 0,
        selected: [],
        users: [],

    }),
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let url = '/users';
            this.$axios.$get(url).then((res) => {
                if (res.status == true) {
                    this.users = res.users;
                }
            })
        },
        userEdit(user_id, user_name, user_email, user_country_code, user_mobile, user_discount_code, user_status, user_role) {
            this.id = user_id,
                this.name = user_name,
                this.email = user_email,
                this.country_code = user_country_code,
                this.mobile = user_mobile,
                this.discount_code = user_discount_code,
                this.status = user_status,
                this.role = user_role
        },
        async userUpdate() {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let url = '/update/user/' + this.id;
            let formData = {
                id: this.id,
                name: this.name,
                email: this.email,
                country_code: this.country_code,
                mobile: this.mobile,
                discount_code: this.discount_code,
                status: this.status,
                role: this.role
            }
            this.$axios.post(url, formData, config).then((res) => {
                if (res.data.status == true) {
                    this.success = res.data.msg,
                        this.editActive = false,
                        this.fetchData();
                }

            });
        },
        async userDelete() {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let url = '/delete/user/' + this.id;
            let formData = {
                id: this.id,
                role: this.role
            }
            this.$axios.delete(url, formData, config).then((res) => {
                if (res.data.status == true) {
                    this.success = res.data.msg,
                        this.editActive = false,
                        this.fetchData();
                }

            });
        }
    }

}
</script>

<style>
.tr-td-size {
    max-width: 100px;
    min-width: 30px;
    width: 50px;
}

.vs-select {
    width: 368px;
}

.vs-input {
    width: 100%;
}
</style>
