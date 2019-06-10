import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';
import Post from '@/components/Post.vue';
import SingleFeed from '@/components/SingleFeed.vue';




Vue.use(VueRouter);

const routes = [
     { path: '/', component: Index , name: 'Index'},
     { path: '/post', component: Post , name: 'Post'},
     { path: '/post/:_id', component: SingleFeed , name: 'SingleFeed'},
];


export default new VueRouter({
    routes,
    mode: 'history'

});