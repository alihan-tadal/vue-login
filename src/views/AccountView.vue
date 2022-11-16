<template>
    <div class="page-account">

        <h2 class="subtitle"> {{ user.username }}</h2>
        <h2 class="subtitle"> {{ user.email }}</h2>

        <button class="button is-danger" @click="logout()">Çıkış Yap</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {

            user: {
                username: '',
                email: '',
            }
        }
    },
    mounted() {
        console.log(axios.defaults.headers.common['Authorization'])
        this.getUserInfo()
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            this.$store.commit('removeToken')
            this.$router.push('/')
        },
        async getUserInfo() {
            axios
                .get('/api/v1/users/me')
                .then(response => {
                    this.user.username = response.data.username
                    this.user.email = response.data.email
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>