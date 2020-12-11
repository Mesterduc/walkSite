<template>
  <div class="home">
    <label for="Telefonvagt">Hvem skal blive tilbage:</label>
    <span>{{ udvalgte }}</span>
    <div></div>
    <button @click="findMedarbejder">Find den heldige</button>

    <afdelingMedarbejder />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import afdelingMedarbejder from "../components/afdMeda";

export default {
  name: "Home",
  data() {
    return {
      udvalgte: "",
    };
  },
  methods: {
    findMedarbejder() {
      var random = []
      var tal = 1000
      this.medarbejder.forEach(e => {
        if(e.antalAlo <= tal){
          tal = e.antalAlo
          random.push(e)
          }
      });
      const udvalgt = random[random.length -1 ]
      this.udvalgte = udvalgt.navn
      udvalgt.antal + 1

        axios
          .put("http://localhost:5000/medarbejder", {navn: udvalgt.navn})
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch('getAfdeling')
            this.$store.dispatch('getMedarbejder')
          })
          .catch((err) => {
            console.log(err);
          });
          // this.OpretAfdeling.navn = null;


      // } else {
      //   this.errors.push("Navn er tomt");
      // }
      
      // e.preventDefault();
    },
  },
  computed: {
    ...mapState(["afdeling", "medarbejder"]),
  },
  components: {
    afdelingMedarbejder,
  },
};
</script>
