<template>
    <div class="page-login">
        <div class="page-signup">
        <div class="columns">
            <div class="column is-4 is-offset-4">        
                <form action="" class="box mt-6" @submit.prevent="submitForm">
                    <h1 class="title">Giriş Yap</h1>
                    <div class="field">
                        <label for="">Kullanıcı Adı</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Parola</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark is-fullwidth">Giriş Yap</button>
                        </div>
                    </div>
                    <hr>
                    <p>Bir hesabın yok mu? <router-link to="/login">Kayıt ol</router-link></p>
                </form>

            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Giriş Yap'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                username: this.username,
                password: this.password,
            }
            await axios
                .post('/api/v1/token/login', formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)
                    this.$router.push("/account") 
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
                
        }
    }
}
</script>