const state={
	isAuth:false,
	token:null
};

const getters={
	isAuth: state => state.isAuth,
	token: state => state.token
};

const mutations={
	setAuth: (state, auth) => state.isAuth = auth,
	setToken: (state, token) => state.token = token

};

const actions={
	setAuthTrue({commit}){
		commit('setAuth', true);
	},
	setAuthFalse({commit}){
		commit('setAuth', false);
	},
	setToken({commit}, token){
		commit('setToken',token);
	}
};

export default{
	state,
	getters,
	actions,
	mutations
}