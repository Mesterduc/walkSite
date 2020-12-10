<template>
  <div class="home">
    <label for="Telefonvagt">Hvem skal blive tilbage:</label>
    <span>?</span>
    <div></div>
    <button @click="udvælgeMedarbejder">Find den heldige</button>

    <afdelingMedarbejder/>
    </div>
</template>

<script>
import axios from "axios";
import afdelingMedarbejder from '../components/afdMeda'

export default {
  name: "Home",
   components: {
    afdelingMedarbejder
  },
  methods: {
    udvælgeMedarbejder() {
    },
  }
};
</script>
