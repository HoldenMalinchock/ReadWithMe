<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer />
      <v-btn color="primary" v-on:click="go_to_login()">Login</v-btn>
      <!-- This is an interesting feature I may want to use later <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <v-btn class="mx-2" color="primary" min-height=100 min-width=200  v-on:click="go_to_scanner()">Scan</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      color="cyan"
      app
    >
      <v-spacer />

      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'LayoutsDemosBaselineFlipped',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    methods: {
        go_to_login(){
            this.$router.push("/login").catch(err => {err})
            this.$store.commit('increment')
            console.log(this.$store.state.count) // -> 1

        },
        go_to_scanner(){
            this.$router.push("/scan").catch(err => {err})
            this.$store.commit('increment')
            console.log(this.$store.state.count) // -> 1

        }
    }
  }
</script>

