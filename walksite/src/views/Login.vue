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
export default {
  data() {
    return {
      bruger: {
        brugernavn: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const afdeling = axios.get("http://localhost:5000/medarbejder", {
        brugernavn: this.bruger.brugernavn.trim(),
        password: this.bruger.password.trim(),
      }).the;
      axios
        .post("http://localhost:5000/login", {
          brugernavn: this.bruger.brugernavn.trim(),
          password: this.bruger.password.trim(),
        })
        .then((resultat) => {
          console.log(resultat);
          this.bruger.brugernavn = "";
          this.bruger.password = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>