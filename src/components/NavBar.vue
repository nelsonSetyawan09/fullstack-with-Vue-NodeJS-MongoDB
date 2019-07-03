<template>
	<nav class="navbar-container">
    <div class="nav-wrapper teal lighten-2">
      	<router-link to="/">
		    	<span  class="brand-logo">Smoohties</span>
		    </router-link>

			<ul id="nav-mobile" class="right hide-on-large-and-down">	
        <li v-if="!isAuth"> 
        	<router-link to="/login">
		    		<span >Login</span>
		    	</router-link>
        </li>
        <li v-if="!isAuth">
        	<router-link to="/auth">
		    		<span>Signup</span>
		    	</router-link>
        </li>
        <li v-if="isAuth" >
        	<router-link to="/">
		    		<span>Logout</span>
		    	</router-link>
        </li>

        <li v-if="isAuth" >
	    		<a href="" class="btn-floating btn-large  teal darken-1">
			    	<router-link to="/addPost">
			    		<i class="material-icons">add</i>
			    	</router-link>
			    </a>
        </li>
    	</ul>
    </div>
  </nav>

</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
	  name: 'NavBar',
	  computed:{
	  	...mapGetters(['isAuth'])
	  }

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar-container{
		margin-bottom: 30px;
	}
	.nav-wrapper{
		padding: 0 20px;
	}

</style>
