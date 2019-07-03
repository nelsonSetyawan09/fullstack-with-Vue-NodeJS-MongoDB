import Vue from 'vue'
import Vuex from 'vuex';
import post from './modules/post';	// file we create in store
import auth from './modules/auth';	// file we create in store



// load Vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
	modules:{
		auth,
	    post
	}
});