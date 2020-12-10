<template>
  <div class="admin">
     <p v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <section class="opret">
      <section class="medarbejder">
        <label class="medarbejder_header">Opret en medarbejder</label>
        <form @submit="createMedarbejder" method="post">
          <input
            type="text"
            name="medarbejder"
            id=""
            v-model="medarbejder.navn"
            placeholder="Indsæt navn"
          />
          <select
            class="medarbejder_dropdown"
            v-model="medarbejder.afdeling"
          >
            <option :value="afd._id" v-for="afd in afdelingS" :key="afd._id">
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
              v-model="afdeling.navn"
              placeholder="Indsæt navn"
            />
            <input class="afdeling_button" type="submit" value="Opret">
          </form>
        </div>
      </section>
    </section>
     <afdelingMedarbejder />
 <!-- v-bind:afdelingS="afdelingS" v-bind:medarbejderS="afdelingS"  -->
 </div>
</template>
<script>
import axios from "axios";
import afdelingMedarbejder from '../components/afdMeda'

export default {
  name: "Home",
  data() {
    return {
      afdeling: {
        navn: null,
      },
      medarbejder: {
        navn: null,
        afdeling: null,
      },
      errors: [],
      afdelingS: [],
      medarbejderS: [],
    };
  },
  methods: {
    createMedarbejder(e) {
      this.errors = [];
      if (this.medarbejder.navn == null) {
        this.errors.push("Medarbejder mangler navn");
      }
      if (this.medarbejder.afdeling == null) {
        this.errors.push("Medarbejder mangler afdeling");
      }
      if (this.errors.length == 0) {
        
        axios
          .post("http://localhost:5000/medarbejder", this.medarbejder)
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch('getMedarbejder')
          })
          .catch((err) => {
            console.log(err);
          });
        this.medarbejder.navn = null;
        this.medarbejder.afdeling = null;

      }

      e.preventDefault();
    },
    createAfdeling(e) {
      this.errors = [];

      if (this.afdeling.navn != null) {
        axios
          .post("http://localhost:5000/afdeling", this.afdeling)
          .then((resultat) => {
            console.log(resultat);
            // location.reload();
            this.$store.dispatch('getAfdeling')
          })
          .catch((err) => {
            console.log(err);
          });
          this.afdeling.navn = null;
      } else {
        this.errors.push("Navn er tomt");
      }
      
      e.preventDefault();
    },
  },
  mounted() {
    axios.get("http://localhost:5000/afdeling").then((res) => {
      this.afdelingS = res.data;
    }),
      axios.get("http://localhost:5000/medarbejder").then((res) => {
        this.medarbejderS = res.data;
      });
  },
  components: {
    afdelingMedarbejder
  },
};
</script>