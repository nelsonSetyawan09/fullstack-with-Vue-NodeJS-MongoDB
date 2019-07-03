<template>
    <div class="valign-wrapper row login-box">
      <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form class="col s12 form-signup">
          <div class="row">
            <div class="input-field col s12">
              <input id="name" type="text" class="validate" v-model="dataDiri.name">
              <label for="name">Name</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="dataDiri.email">
              <label for="email">Email</label>
            </div>
          </div>
          
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="dataDiri.password">
              <label for="password">Password</label>
            </div>
          </div>
      

          <div class="card-action right-align">
            <input 
              type="submit" 
              class="btn  
              waves-effect waves-light teal darken-1" 
              value="signup"
              @click.prevent="signup">
          </div>
        </form>
      </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex';
  export default {
    name: 'Signup',
    data(){
      return {
        dataDiri:{
          name:null,
          password:null,
          email:null
        }
      }
    },
    methods:{
      ...mapActions(['setAuthTrue','setAuthFalse']),
      signup(){
        fetch('http://localhost:3000/auth/signup',{
          method: 'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name: this.dataDiri.name,
            email: this.dataDiri.email,
            password: this.dataDiri.password
          })
        })
          .then(res =>{
            if(res.status === 422){
              throw new Error('validate failed, make sure email not already exist!!')
            }

            if (res.status !== 200 && res.status !== 201) {
              console.log('Error!');
              throw new Error('Creating a user failed!');
            }

            return res.json();
          })
          .then(resData =>{
            console.log(resData);
            this.setAuthTrue();
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            console.log(err);
            this.setAuthFalse()
          });
      }
    }
  }
</script>

<style scoped> 
  .card{
    padding: 15px !important;
  }

</style>