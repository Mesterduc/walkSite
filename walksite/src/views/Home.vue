<template>
  <div class="home">
    <section class="tlf-container">
      <label for="Telefonvagt" class="tlf_header"
        >Hvem skal blive tilbage:</label
      >
      <span class="tlf_udvalgte">{{ udvalgte }}</span>
      <button @click="findMedarbejder" class="tlf_button">
        Find den heldige
      </button>
    </section>
    <section class="syge">
      <label for="">Frivillig</label>
      <input type="text "  placeholder="Indsæt et navn" v-model="frivillig"/>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        :value="this.fraværende.navn"
      ></textarea>
    </section>

    <afdelingMedarbejder @getMedarbejderStats="medarbejderData" />
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
      udvalgte: "?",
      fraværende: {
        navn: [],
        id: [],
      },
      frivillig: ""
    };
  },
  methods: {
    findMedarbejder() {
      var random = [];
      var tal = 1000;
      this.medarbejder.forEach((e) => {
        if (e.antalAlo <= tal && !this.fraværende.id.includes(e._id)) {
          tal = e.antalAlo;
          random.push(e);
        }
      });
      if (random.length != 0) {
        const udvalgt = random[random.length - 1];
        this.udvalgte = udvalgt.navn;
        udvalgt.antal + 1;

        axios
          .put("http://localhost:5000/medarbejder", { navn: udvalgt.navn })
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch("getAfdeling");
            this.$store.dispatch("getMedarbejder");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    medarbejderData(data) {
      this.fraværende.navn.push(data.navn);
      this.fraværende.id.push(data._id);
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
