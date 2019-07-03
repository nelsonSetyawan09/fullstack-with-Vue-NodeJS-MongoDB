<template>
  <div>
    <div v-if="!posts">
      <h2>not post found</h2>
    </div>
    <!-- poztz -->
    <div class="row">
      <div class="col s12 m6" v-for="post in posts" :key="post._id">
        <div class="index card blue-grey lighten-1">

          <div class="card-content grey-text text-darken-3">
            <i class="material-icons delete-icons" @click="deletePost({id:post._id,token:token})">delete</i>
            <span class="card-title blue-grey-text text-darken-4">{{post.title}}</span>
              <p>
                {{post._id}}
              </p>
              <p>{{post.content}}</p>
          </div>

          <div class="card-action right-align">
            <router-link :to="{name: 'SingleFeed', params:{_id: post._id}}">
              View
              <!-- <i class="material-icons edit">edit</i> -->
            </router-link>
                      
            <router-link :to="{name: 'EditPost', params:{_id: post._id}}">
              Edit
              <!-- <i class="material-icons edit">edit</i> -->
            </router-link>          
          </div>
          
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="pagination-trial center">
      <a class="waves-effect waves-light btn" 
          v-if="hasPrevious"
          @click.prevent="page = page-1">Previous</a>
      <a class="waves-effect waves-light btn" 
          v-if="hasNext"
          @click.prevent="page = page+1">Next</a>
    </div>
  </div>
</template>


<script>  
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'Index',
    data(){
      return {
        page:1

      }
    },
    computed:{
      ...mapGetters(['posts', 'totalItems', 'perPage','token']),
      hasPrevious(){
        return this.page > 1;
      },
      hasNext(){
        return this.page * this.perPage < this.totalItems;
      }
    },
    watch:{
      page(){
        this.fetchPosts({page: this.page,token: this.token});
      }
    },
    methods:{
      ...mapActions(['fetchPosts', 'deletePost']),
    },
    created(){
      this.fetchPosts({page: this.page,token: this.token});
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

  .pagination-trial{
    margin-top: 15px;
    margin-bottom: 50px; 
  }
  .pagination-trial .btn{
    margin: 0 5px;
  }
</style>
