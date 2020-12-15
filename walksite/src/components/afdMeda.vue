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
          v-for="(afdM, index) in afd.medarbejder" :key="index"
          @click="getMedarbejder(afdM)"
        >
          <span class="table_worker-name">{{ afdM.navn }}</span>
          <span class="table_worker-antal">{{ afdM.antal }}</span>
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
    ...mapState(["afdeling"]),
  },
   methods: {
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