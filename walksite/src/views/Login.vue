<template>
  <section class="login">
    <label for="brugerNavn" class="login_lbl">Brugernavn</label>
    <input
      type="text"
      name=""
      v-model="bruger.brugernavn"
      class="login_password"
      placeholder="Brugernavn"
    />
    <label for="brugerNavn" class="login_lbl">Password</label>
    <input
      type="text"
      name=""
      v-model="bruger.password"
      class="login_password"
      placeholder="Password"
    />
    <button class="login_button" @click="login()">Login</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bruger: {
        brugernavn: "",
        password: "",
      },
      auth: null,
    };
  },
  methods: {
    login() {
      axios
        .post(`http://localhost:5000/login/test`, this.bruger)
        .then((resultat) => {
          if (resultat.data == true) {
            this.$store.dispatch('toggleAuth')
            this.$router.push("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>