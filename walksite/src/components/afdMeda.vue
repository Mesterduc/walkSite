<template>
  <div class="data">
    <section class="table-container">
      <div class="table" v-for="(afd, index) in afdeling" :key="index">
        <span class="table_header" @click="getElement(afd)"> {{ afd.navn }} </span>
        <div class="table_col-header">
          <span>navn</span>
          <span>antal</span>
        </div>
        <div
          class="table_worker"
          v-for="medA in findMedarbejder(afd._id)"
          :key="medA._id"
          @click="getMedarbejder(medA)"
        >
          <span class="table_worker-name">{{ medA.navn }}</span>
          <span class="table_worker-antal">{{ medA.antal }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["afdeling", "medarbejder"]),
  },
   methods: {
    findMedarbejder: function (id) {
      let arr = [];
      this.medarbejder.forEach((e) => {
        if (id == e.afdeling) {
          arr.push(e);
        }
      });
      return arr;
    },
    getElement(navn){
      this.$emit('getAfdelingNavn', navn)
      
      },
    getMedarbejder(stat){
      this.$emit('getMedarbejderStats', stat)
    }
  },
  async mounted() {
    await this.$store.dispatch('getAfdeling')
    await this.$store.dispatch('getMedarbejder')
  },
};
</script>