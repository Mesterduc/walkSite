<template>
  <div class="home">
    <section class="home-container">
      <section class="tlf-container">
        <label for="Telefonvagt" class="tlf_header"
          >Hvem skal blive tilbage:</label
        >
        <span class="tlf_udvalgte">{{ udvalgte }}</span>
        <button @click="findMedarbejder" class="tlf_button">
          Find den heldige
        </button>
      </section>
      <section class="syg-container">
        <label for="">Frivillig</label>
        <input type="text " placeholder="Indsæt et navn" v-model="frivillig" />
        <button @click="frivilligGem">frivillig</button>
        <textarea
          name=""
          class="syg_textarea"
          cols="30"
          rows="5"
          readonly
          :value="this.fraværende.navn"
          placeholder="Tryk på en medarbejder som er syg"
        ></textarea>
      </section>
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
      frivillig: "",
    };
  },
  methods: {
    findMedarbejder() {
      var random = [];
      var tal = 1000;
      this.medarbejder.forEach((e) => {
        if (e.antalAlo < tal) {
          random = [];
        }
        if (
          e.antalAlo <= tal &&
          !this.fraværende.id.includes(e._id) &&
          e.sidst != true
        ) {
          tal = e.antalAlo;
          random.push(e);
        }
      });
      if (random.length != 0) {
        const udvalgt = random[Math.floor(Math.random() * random.length)];
        this.udvalgte = udvalgt.navn;
        console.log(udvalgt);

        axios
          .put("http://localhost:5000/medarbejder", { navn: udvalgt.navn })
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch("getAfdeling");
            this.$store.dispatch("getMedarbejder");
            this.fraværende.navn = [];
            this.fraværende.id = [];
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    medarbejderData(data) {
      if (!this.fraværende.navn.includes(data.navn)) {
        this.fraværende.navn.push(data.navn);
        this.fraværende.id.push(data._id);
      } else {
        this.fraværende.navn.forEach(function (item, index, object) {
          if (item === data.navn) {
            object.splice(index, 1);
          }
        });
        this.fraværende.id.forEach(function (item, index, object) {
          if (item === data._id) {
            object.splice(index, 1);
          }
        });
      }
    },
    frivilligGem() {
      axios
        .put("http://localhost:5000/medarbejder", {
          navn: this.frivillig.trim(),
        })
        .then((resultat) => {
          console.log(resultat);
          this.$store.dispatch("getAfdeling");
        })
        .catch((err) => {
          console.log(err);
        });
      this.frivillig = "";
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
