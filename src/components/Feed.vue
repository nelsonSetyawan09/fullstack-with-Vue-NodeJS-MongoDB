<template>

  <div class="row">
    <div class="col s12 m6" v-for="zmoothie in smoothies" :key="zmoothie._id">
      <div class="index card blue-grey lighten-1">

        <div class="card-content grey-text text-darken-3">
          <i class="material-icons delete-icons" @click="deleteSmoothie(zmoothie._id)">delete</i>
          <span class="card-title blue-grey-text text-darken-4">{{zmoothie.title}} - {{zmoothie._id}}</span>
          <p>{{zmoothie.content}}</p>
        </div>

        <div class="card-action right-align">
          <router-link :to="{name: 'SingleFeed', params:{_id: zmoothie._id}}">
            View
            <!-- <i class="material-icons edit">edit</i> -->
          </router-link>
                    
          <router-link :to="{name: 'EditPost', params:{_id: zmoothie._id}}">
            Edit
            <!-- <i class="material-icons edit">edit</i> -->
          </router-link>          
        </div>
        

<!--         <router-link :to="{name: 'SingleFeed', params:{_id: zmoothie._id}}">
          <i class="material-icons edit">edit</i>
        </router-link> -->
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
    position:relative;
  }
 .index .delete-icons{
      position: absolute;
      top:3px;
      right: 3px;
      color: #37474f;
      cursor: pointer;
  }

  .index .edit{
      position: absolute;
      bottom:3px;
      right: 3px;
      color: #37474f;
      cursor: pointer;
  }
</style>