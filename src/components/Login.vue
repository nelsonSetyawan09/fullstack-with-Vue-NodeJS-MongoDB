<template>
    <div class="valign-wrapper row login-box">
      <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form class="col s12 form-signup">
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
              value="login"
              @click.prevent="login">
          </div>
        </form>
      </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex';
  export default {
    name: 'Login',
    data(){
      return {
        dataDiri:{
          password:null,
          email:null
        }
      }
    },
    methods:{
      ...mapActions(['setToken','setAuthTrue','setAuthFalse']),
      login(){
        fetch('http://localhost:3000/auth/login',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email: this.dataDiri.email,
            password: this.dataDiri.password
          })
        })
        .then(res =>{
            if(res.status === 422){
              throw new Error('validate failed')
            }

            if (res.status !== 200 && res.status !== 201) {
              console.log('Error!');
              throw new Error('could not authenticate!');
            }

            return res.json();
          })
          .then(resData =>{
            console.log(resData);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
            localStorage.setItem('expiryDate', expiryDate.toISOString());

            this.setAuthTrue();
            this.setToken(resData.token);           
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            console.log(err);
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