<template>
	<div class="navbar">
		<nav class=" nav-extended card-panel teal lighten-2">
	  	<div class="nav-content">
		    <router-link to="/">
		    	<span class="nav-title">Smoohties</span>
		    </router-link>
		    <a href="" class="btn-floating btn-large halfway-fab  teal darken-1">
		    	<router-link to="/post">
		    		<i class="material-icons">add</i>
		    	</router-link>
		    </a>

		  </div>
	  </nav>
	</div>   
</template>

<script>
export default {
  name: 'NavBar'

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar{
	margin-top: -8px;
	margin-bottom: 50px;
	}
</style>
