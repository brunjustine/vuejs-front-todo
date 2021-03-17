import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TodoListId from '../views/TodoListId.vue'
import TodoId from '../views/TodoId.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path:'/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/:todo_list_id',
        name: 'TodoListId',
        component: TodoListId
    },
    {
        path: '/:todo_list_id/:todo_id',
        name: 'TodoId',
        component: TodoId
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router