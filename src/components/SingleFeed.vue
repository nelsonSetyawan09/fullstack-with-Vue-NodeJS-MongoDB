<template>
	<div class="index row" v-if="smoothie">
	   	<div class="card blue-grey lighten-1 col m6">
	      <div class="card-content" >
	        <i class="material-icons delete-icons" @click="deleteSmoothie(smoothie._id)">delete</i>                 
	        <span class="card-title blue-grey-text text-darken-4">{{smoothie.title}} - {{smoothie._id}}</span>
	        <p>{{smoothie.content}}</p>
	        <p>{{smoothie.imageUrl}}</p>
	        <p>{{smoothie.creator.name}}</p>
	        <img :src="image" style="width:100%;">
	       </div>
	     </div>

 	</div>
</template>


<script type="text/javascript">
	export default {
		name: 'SingleFeed',
		data(){
			return {
				smoothie: null,
				image:null
			}
		},
		methods:{
   			deleteSmoothie(id){
					console.log('delete post from database');
			},
			fetchSmoothie(){
				console.log('fetch post', this.$route.params._id);
				 // this.$route.params._id  ==> berasal dari router
        		fetch(`http://localhost:3000/feed/post/${this.$route.params._id}`)
	          		.then(res =>{
	            		if(res.status !== 200){
	              			throw new Error('can not fetch post')
	            		}
	            		return res.json()
	          		})
	          		.then(resData =>{
	            		this.smoothie = resData.post;
	            		this.image = 'http://localhost:3000/'+ resData.post.imageUrl;
	          		})
      		}
		},
		created(){
			this.fetchSmoothie()
		}
	}
</script>

<style scoped>
  .index{
    display: grid;
    grid-template-columns: 1fr;
  }
  .index .card{
  	margin: 0 auto;
  }
  .index .card-title{
    margin-bottom: 40px;
  }

  .index .ingredients li{
   display: inline-block;
  }

  .index .delete-icons{
    position: absolute;
    top:5px;
    right: 5px;
    cursor: pointer;
    color: #37474f;
  }
  .index .edit-smoothie__btn{
      position: absolute;
      bottom:0;
      right: 0;
  }
</style>