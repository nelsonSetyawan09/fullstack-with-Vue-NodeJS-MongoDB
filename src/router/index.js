import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';
import AddPost from '@/components/AddPost.vue';
import SingleFeed from '@/components/SingleFeed.vue';
import EditPost from '@/components/EditPost.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';







Vue.use(VueRouter);

const routes = [
     { path: '/', component: Index , name: 'Index'},
     { path: '/addPost', component: AddPost , name: 'AddPost'},
     { path: '/post/:_id', component: SingleFeed , name: 'SingleFeed'},
     { path: '/editPost/:_id', component: EditPost , name: 'EditPost'},
     { path: '/auth', component: Signup , name: 'Signup'},
     { path: '/login', component: Login , name: 'Login'},




];


export default new VueRouter({
    routes,
    mode: 'history'

});