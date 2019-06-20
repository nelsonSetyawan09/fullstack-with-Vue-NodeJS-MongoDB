import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';
import Post from '@/components/Post.vue';
import SingleFeed from '@/components/SingleFeed.vue';
import EditPost from '@/components/EditPost.vue';
import Signup from '@/components/Signup.vue';






Vue.use(VueRouter);

const routes = [
     { path: '/', component: Index , name: 'Index'},
     { path: '/post', component: Post , name: 'Post'},
     { path: '/post/:_id', component: SingleFeed , name: 'SingleFeed'},
     { path: '/postEdit/:_id', component: EditPost , name: 'EditPost'},
     { path: '/auth', component: Signup , name: 'Signup'}


];


export default new VueRouter({
    routes,
    mode: 'history'

});