<template>
  
    <Feed :smoothies="smoothies" @deleteSmoothie="deleteSmoothie"/>
  
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
        smoothies:null
      }
    },
    methods:{
      deleteSmoothie(id){
        this.smoothies = this.smoothies.filter(smoothie => smoothie._id != id);
      },
      fetchSmoothies(){
        console.log('fetch posts');
        fetch('http://localhost:3000/feed/posts')
          .then(res =>{
            if(res.status !== 200){
              throw new Error('can not fetch posts')
            }
            return res.json()
          })
          .then(resData =>{
            this.smoothies = resData.posts;
          })
      }
    },
    created(){
      this.fetchSmoothies()
    }

  }
</script>


<style >
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
</style>
