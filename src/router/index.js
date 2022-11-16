import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import AccountView from '../views/AccountView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignUpView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/account', name: 'account', component: AccountView },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
