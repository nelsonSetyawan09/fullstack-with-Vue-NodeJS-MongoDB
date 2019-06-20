<template>
	<div class="valign-wrapper row login-box">
  		<div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
    		<form class="col s12">
		      <div class="row">
		      	<div class="input-field col s12">
		          <input id="title" type="text" class="validate" v-model="title">
		          <label for="title">Title</label>
		        </div>
		       </div>

				<div class="row">
			 		<div class = "file-field input-field">
			          <div class = "btn">
			             <span>Browse</span>
			             <input type = "file" @change="onFileChange"/>
			          </div>
			          <div class = "file-path-wrapper">
			             <input class = "file-path validate" type = "text"
			                placeholder = "Upload file" />
			          </div>
			        </div>
			     </div>

		      	<div class="row">
			        <div class="input-field col s12">
			          <textarea id="textarea1" class="materialize-textarea" v-model="content"></textarea>
			          <label for="textarea1">Content</label>
			        </div>
		     	</div>
		      <div class="card-action right-align">
		        <input 
		        	type="submit" 
		        	class="btn  
		        	waves-effect waves-light teal darken-1" 
		        	value="Post"
		        	@click.prevent="addPost">
		      </div>
    		</form>
    	</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name:'Post',
		data(){
			return {

				title: '',
				content:'',
				image:''
			}
		},
		methods:{
			addPost(){
				const formData = new FormData();
				formData.append('title', this.title);
				formData.append('content',this.content );

				 // in the multer rest-api, we use name `image`
				formData.append('image', this.image, this.image.name); 

				fetch('http://localhost:3000/feed/post',{
					method:"POST",
					body: formData
				})
				.then(data => {
					console.log(data);
					data.json()
				})
				.then(result => {
					// console.log(result);
					this.$router.push({ name: 'Index' })
				})
				.catch(err => console.log(err))
			},
			onFileChange(event){
				this.image =event.target.files[0];
				console.log(this.image);
   			 }
   		}
	}
</script>
