<template>
  <div class="home">
    <section class="table-container">
      <div class="table" v-for="afd in afdeling" :key="afd._id">
        <span class="table_header"> {{ afd.navn }} </span>
        <div class="table_col-header">
          <span>navn</span>
          <span>antal</span>
        </div>
        <div class="table_worker" v-for="medA in findMedarbejder(afd._id)" :key="medA._id">
          <span class="table_worker-name" >{{
            medA.navn
          }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      afdeling: [],
      medarbejder: [],
    };
  },
  methods: {
    findMedarbejder: function (id) {
      let arr = [];
      this.medarbejder.forEach((e) => {
        if (id == e.afdeling) {
          arr.push(e);
        }
			});
			return arr
    },
  },
  mounted() {
    axios.get("http://localhost:5000/afdeling").then((res) => {
      this.afdeling = res.data;
    }),
      axios.get("http://localhost:5000/medarbejder").then((res) => {
        this.medarbejder = res.data;
      });
  },
  components: {},
};
</script>
