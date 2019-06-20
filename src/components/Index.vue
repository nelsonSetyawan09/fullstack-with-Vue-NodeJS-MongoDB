<template>
    <div>
      <Feed :smoothies="smoothies" @deleteSmoothie="deleteSmoothie"/>
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
  import Feed from './Feed.vue';
  export default {
    components:{
      Feed
    },
    name: 'Index',
    data(){
      return {
        smoothies:null,
        totalItems:null,
        perPage: null,
        page:1

      }
    },
    computed:{
      hasPrevious(){
        return this.page > 1;
      },
      hasNext(){
        return this.page * this.perPage < this.totalItems;
      }
    },
    watch:{
      page(){
        this.fetchSmoothies()
      }
    },
    methods:{
      deleteSmoothie(id){
        fetch(`http://localhost:3000/feed/post/${id}`,{
           method: 'DELETE'})
          .then(res =>{
            if(res.status !==200 && res.status !==201){
              throw new Error('delete post failed!')
            };
            return res.json();
          })
          .then(resData =>{
            console.log(resData);
            this.smoothies = this.smoothies.filter(smoothie => smoothie._id !== id);
          })
          .catch(err => console.log(err));
      },
      fetchSmoothies(){
        fetch(`http://localhost:3000/feed/posts?page=${this.page}`)
          .then(res =>{
            if(res.status !== 200){
              throw new Error('can not fetch posts')
            }
            return res.json()
          })
          .then(resData =>{
            console.log(resData.message);
            this.smoothies = resData.posts;
            this.totalItems= resData.totalItems;
            this.perPage = resData.perPage;
          })
          .catch(err => console.log(err))
      }
    },
    created(){
      this.fetchSmoothies()
    }

  }
</script>


<style scoped>
  .pagination-trial{
    margin-top: 15px;
    margin-bottom: 50px; 
  }
  .pagination-trial .btn{
    margin: 0 5px;
  }
</style>
