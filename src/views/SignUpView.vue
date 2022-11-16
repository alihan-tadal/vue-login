<template>
    <div class="page-signup">
        <div class="columns">
            <div class="column is-4 is-offset-4">        
                <form action="" class="box mt-6" @submit.prevent="submitForm">
                    <h1 class="title">Kayıt Ol</h1>
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
                    <div class="field">
                        <label>Parola Tekrarı</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password2">
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark is-fullwidth">Kayıt Ol</button>
                        </div>
                    </div>
                    <hr>
                    <p>Bir hesabın var mı? <router-link to="/login">Giriş yap.</router-link></p>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            errors: [],
        }
    },
    methods: {
        submitForm() {
            this.errors = []
            if (this.username === '') {
                this.errors.push('Kullanıcı adı boş bırakılamaz.')
            }
            if (this.password === '') {
                this.errors.push('Şifre alanı boş bırakılamaz.')
            }
            if (this.password !== this.password2) {
                this.errors.push('The passwords doesn\'t match')
            }
            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        toast({
                            message: "Hesap oluşturuldu, lütfen giriş yapın.",
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        this.$router.push('/login')
                    })

            }
        }
    }
}
</script>