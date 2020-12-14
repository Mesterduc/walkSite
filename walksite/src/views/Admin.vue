<template>
  <div class="admin">
    <section class="controlle">
     
    <section class="opret"><p v-if="errors.length">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
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
    
    <section class="redigere">
      <section class="redigere-container">
        <label for="" class="redigere_lbl">Navn</label>
        <input type="text" class="redigere_inputnavn" placeholder="Navn" v-model="Stats.navn">
      </section>

      <section class="redigere-container">
        <label for="" class="redigere_lbl">Antal</label>
        <input type="text" class="redigere_inputantal" placeholder="antal" v-model="Stats.antal">
      </section>

      <section class="redigere-container">
        <label for="" class="redigere_lbl">Afdeling</label>
        <select
            class="medarbejder_dropdown"
            v-model="Stats.afdeling"
          >
            <option :value="afdR._id" v-for="afdR in afdeling" :key="afdR._id">
              {{afdR.navn}}
              </option>
          </select>
      </section>
        <section class="knap">
      <button class="redigere_button" @click="redigereMedarbejder">Gem</button>
      <button class="redigere_button" @click="sletMedarbejder">Slet</button>

        </section>
    </section>
    <section class="delete" >
      <label class="delete_header" for="slet en afdeling">Slet en afdeling</label>
      <input class="delete_field" type="text" disabled placeholder="Tryk på en afdeling" v-model="afdelingValue.navn">
      <input class="delete_button" @click="sletAfdeling"  type="button" value="Slet">
    </section>
    </section>
     <afdelingMedarbejder @getAfdelingNavn="afdelingData" @getMedarbejderStats="medarbejderData"/>
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
      OpretAfdeling: {
        navn: "",
      },
      OpretMedarbejder: {
        navn: "",
        antalAlo: 0,
        afdeling: null,
      },
      errors: [],
      afdelingValue: {
        navn: "",
        id: "",
      },
      Stats: {
        _id: "",
        navn: "",
        antal: "",
        afdeling: "",
      },
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
        var antal = 0;
        if(this.medarbejder.length != 0){
          this.medarbejder.forEach((e) => {
          antal += e.antalAlo;
        });
        antal = antal / this.medarbejder.length;
        }
  
        this.OpretMedarbejder.antalAlo = Math.ceil(antal);

        axios
          .post("http://localhost:5000/medarbejder", this.OpretMedarbejder)
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch("getMedarbejder");
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
            this.$store.dispatch("getAfdeling");
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
    sletAfdeling() {
      if (this.afdelingValue.navn != "") {
        axios
          .delete(`http://localhost:5000/afdeling/${this.afdelingValue.id}`)
          .then((resultat) => {
            console.log(resultat);
            this.$store.dispatch("getAfdeling");
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .delete(`http://localhost:5000/medarbejder`, {
            data: { afdeling: this.afdelingValue.id },
          })
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
    redigereMedarbejder() {
      if (this.Stats._id != "") {
        axios
          .put(`http://localhost:5000/medarbejder/admin`, {
            _id: this.Stats._id,
            navn: this.Stats.navn,
            antal: this.Stats.antal,
            afdeling: this.Stats.afdeling,
          })
          .then((resultat) => {
            // // console.log(resultat);
            this.$store.dispatch("getAfdeling");
            this.$store.dispatch("getMedarbejder");
            this.Stats._id = "";
            this.Stats.navn = "";
            this.Stats.afdeling = "";
            this.Stats.antal = 0;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    sletMedarbejder() {
      axios
        .delete(`http://localhost:5000/medarbejder/${this.Stats._id}`)
        .then((resultat) => {
          console.log(resultat);
          this.$store.dispatch("getMedarbejder");
          this.$store.dispatch("getAfdeling");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    afdelingData(e) {
      this.afdelingValue.navn = e.navn;
      this.afdelingValue.id = e._id;
    },
    medarbejderData(e) {
      // console.log(e.afdeling + " ad " + e._id)
      (this.Stats._id = e._id), (this.Stats.navn = e.navn);
      this.Stats.antal = e.antal;
      this.Stats.afdeling = e.afdeling;
    },
  },
  async mounted() {
    // await this.$store.dispatch('getAfdeling')
  },
  components: {
    afdelingMedarbejder,
  },
};
</script>