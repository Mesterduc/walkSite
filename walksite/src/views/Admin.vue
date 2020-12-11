<template>
  <div class="admin">
     <p v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
  <!-- <label for="">{{afdeling}} kasodkos</label> -->
    <section class="opret">
      <section class="medarbejder">
        <label class="medarbejder_header">Opret en medarbejder</label>
        <form @submit="createMedarbejder" method="post">
          <input
            type="text"
            name="medarbejder"
            id=""
            v-model="OpretMedarbejder.navn"
            placeholder="Indsæt navn"
          />
          <select
            class="medarbejder_dropdown"
            v-model="OpretMedarbejder.afdeling"
          >
            <option :value="afd._id" v-for="afd in afdeling" :key="afd._id">
              {{afd.navn}}
              </option>
          </select>
          <input  class="medarbejder_button" type="submit" value="Opret">
        </form>
      </section>
      <section class="afdeling">
        <label class="afdeling_header">Opret en afdeling</label>
        <div>
          <form @submit="createAfdeling" method="post">
            <input
              type="text"
              name="afdeling"
              id="afdeling"
              v-model="OpretAfdeling.navn"
              placeholder="Indsæt navn"
            />
            <input class="afdeling_button" type="submit" value="Opret">
          </form>
        </div>
      </section>
    </section>
     <afdelingMedarbejder />
 </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import afdelingMedarbejder from '../components/afdMeda'

export default {
  name: "Home",
  data() {
    return {
      OpretAfdeling: {
        navn: null,
      },
      OpretMedarbejder: {
        navn: null,
        antalAlo: null,
        afdeling: null,
      },
      errors: [],
    };
  },
  computed: {
    ...mapState(["afdeling", "medarbejder"]),
  },
  methods: {
    createMedarbejder(e) {
      this.errors = [];
      if (this.OpretMedarbejder.navn == null) {
        this.errors.push("Medarbejder mangler navn");
      }
      if (this.OpretMedarbejder.afdeling == null) {
        this.errors.push("Medarbejder mangler afdeling");
      }
      if (this.errors.length == 0) {
       var antal = 0
          this.medarbejder.forEach(e => {
            antal += e.antalAlo 
          });
          antal = antal / this.medarbejder.length  
          this.OpretMedarbejder.antalAlo = Math.ceil(antal)
        axios
          .post("http://localhost:5000/medarbejder", this.OpretMedarbejder)
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch('getMedarbejder')
          })
          .catch((err) => {
            console.log(err);
          });
        this.OpretMedarbejder.navn = null;
        this.OpretMedarbejder.afdeling = null;

      }

      e.preventDefault();
    },
    createAfdeling(e) {
      this.errors = [];

      if (this.OpretAfdeling.navn != null) {
        axios
          .post("http://localhost:5000/afdeling", this.OpretAfdeling)
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch('getAfdeling')
          })
          .catch((err) => {
            console.log(err);
          });
          this.OpretAfdeling.navn = null;
      } else {
        this.errors.push("Navn er tomt");
      }
      
      e.preventDefault();
    },
  },
  async mounted() {
    // await this.$store.dispatch('getAfdeling')
  },
  components: {
    afdelingMedarbejder
  },
};
</script>