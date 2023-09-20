import {createRouter, createWebHistory} from "vue-router";
import axios from "axios";

const router = createRouter( {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/users/index',
            name: 'user.index',
            component: () => import('../views/user/Index.vue')
        },
        {
            path: '/users/:id/show',
            name: 'user.show',
            component: () => import('../views/user/Show.vue')
        },
        {
            path: '/users/feed',
            name: 'user.feed',
            component: () => import('../views/user/Feed.vue')
        },

        {
            path: '/users/login',
            name: 'user.login',
            component: () => import('../views/user/Login.vue')
        },
        {
            path: '/users/registration',
            name: 'user.registration',
            component: () => import('../views/user/Registration.vue')
        },
        {
            path: '/users/personal',
            name: 'user.personal',
            component: () => import('../views/user/Personal.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {


    axios.get('/api/user')
        .catch(e => {
            if (e.response.status === 401) {
                localStorage.key('x_xsrf_token') ? localStorage.removeItem('x_xsrf_token') : ''
            }
        })

    const token = localStorage.getItem('x_xsrf_token')

    if (!token) {
        if (to.name === 'user.login' || to.name === 'user.registration' ) {
            return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }
    if (to.name === 'user.login' || to.name === 'user.registration' && token) {
        return next({
            name: 'user.personal'
        })
    }

    next()
})

export default router
