<template>
	<div class="home">
		<section class="table-container">
			<div class="table" v-for="afd in afdeling" :key="afd._id">
				<span class="table_header"> {{ afd.navn }} </span>
				<div class="table_col-header">
					<span >navn</span>
					<span>antal</span>
				</div>
        <div class="table_worker">
					<span class="table_worker-name">kristine holmskov</span>
					<span class="table_worker-antal">100</span>
				</div>
        <div class="table_worker">
					<span class="table_worker-name">asdadasda</span>
					<span class="table_worker-antal">82</span>
				</div>
			</div>

      
		</section>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
	name: 'Home',
	data() {
		return {
			afdeling: []
		}
	},
	computed: {
		
	},
	mounted() {
		axios.get('http://localhost:5000/afdeling')
		.then((res) => {
			this.afdeling = res.data
		})
	},
	components: {},
}
</script>
