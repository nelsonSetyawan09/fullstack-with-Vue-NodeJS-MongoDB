const state={
	posts:null,
	totalItems: null,
	perPage:null
};

const getters={
	posts : state => state.posts,
	totalItems: state => state.totalItems,
	perPage: state => state.perPage
};

const mutations={
	setPosts: (state, posts) => state.posts = posts,
	setTotalItems: (state, totalItems) => state.totalItems = totalItems,
	setPerPage:  (state, perPage) => state.perPage = perPage,
	deletePost: (state, id) => {
		state.posts =  state.posts.filter(post => post['_id'] !== id);
		state.totalItems -=1;
	}
};

const actions={
	fetchPosts({commit}, payload){
		fetch(`http://localhost:3000/feed/posts?page=${payload.page}`,
			{
				// we can use `Authorization` because we enable in server
				headers: {Authorization: 'Bearer '+payload.token}
			})
			.then(res =>{
            	if(res.status !== 200){
              		throw new Error('can not fetch posts')
           		}
            	return res.json()
          	}).
          	then(resData =>{
          		console.log(resData.message);
          		commit('setPosts', resData.posts)
          		commit('setTotalItems', resData.totalItems)
          		commit('setPerPage', resData.perPage)
          	})
			.catch(err => console.log(err));
	},
	deletePost({commit}, payload){
		fetch(`http://localhost:3000/feed/post/${payload.id}`,
			{
				method: 'DELETE',
				// we can use `Authorization` because we enable in server
				headers: {Authorization: 'Bearer '+payload.token}
			})
        	.then(res =>{
            	if(res.status !==200 && res.status !==201){
              		throw new Error('delete post failed!')
            	};
            	return res.json();
        	})
        	.then(resData =>{
            	console.log('delete',resData);
            	commit('deletePost', payload.id)
          	})
        	.catch(err => console.log(err));
	}
};

export default{
	state,
	getters,
	actions,
	mutations
}