<template>
	<nav class="navbar-container">
    <div class="nav-wrapper teal lighten-2">
      	<router-link to="/">
		    	<span  class="brand-logo">Smoohties</span>
		    </router-link>

			<ul id="nav-mobile" class="right hide-on-large-and-down">	
        <li v-if="!isAuthenticate"> 
        	<router-link to="/">
		    		<span >Login</span>
		    	</router-link>
        </li>
        <li v-if="!isAuthenticate">
        	<router-link to="/auth">
		    		<span>Signup</span>
		    	</router-link>
        </li>
        <li v-if="isAuthenticate" >
        	<router-link to="/">
		    		<span>Logout</span>
		    	</router-link>
        </li>

        <li v-if="isAuthenticate" >
	    		<a href="" class="btn-floating btn-large  teal darken-1">
			    	<router-link to="/post">
			    		<i class="material-icons">add</i>
			    	</router-link>
			    </a>
        </li>
    	</ul>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'NavBar',
  props:['isAuthenticate']

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
