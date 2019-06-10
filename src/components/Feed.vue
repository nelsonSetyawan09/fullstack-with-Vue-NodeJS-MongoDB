<template>
	<div class="index container">
		<div class="card blue-grey lighten-1" v-for="zmoothie in smoothies" :key="zmoothie._id">
			<div class="card-content" >
				<i class="material-icons delete-icons" @click="deleteSmoothie(zmoothie._id)">delete</i>                 
				<span class="card-title blue-grey-text text-darken-4">{{zmoothie.title}} - {{zmoothie._id}}</span>
				<p>{{zmoothie.content}}</p>

				<router-link :to="{name: 'SingleFeed', params:{_id: zmoothie._id}}">
					<i class="material-icons edit">edit</i>
				</router-link>

			</div>
		</div>
 	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'Feed',
		props:['smoothies'],
		methods:{

			// deleteSmoothie(id){
			// 	console.log('delete post from child');
			// 	console.log('working because type Array (pass by reference');
			// 	console.log('not recommand');
   //      		this.smoothies = this.smoothies.filter(smoothie => smoothie._id != id);
   //    		},
   			deleteSmoothie(id){
				this.$emit('deleteSmoothie',id)
			}
		}
	}
</script>

<style scoped>
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
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
  .index .edit{
      position: absolute;
      bottom:3px;
      right: 3px;
      color: #37474f;
  }
</style>