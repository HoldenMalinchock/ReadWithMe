<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer />
      <v-btn color = "primary" v-on:click="videos()">Vid</v-btn>
      <v-btn v-if="$store.state.username === null" color="primary" v-on:click="go_to_login()">Login</v-btn>
      <v-btn v-else color="primary" v-on:click="logout()">Logout</v-btn>
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
            <img src="https://rwm-videos.s3.amazonaws.com/69e7a3bfd950f20775821027c976f398/Bill Mines/picture/ValMeme.jpg">
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      color="primary"
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
        },
        go_to_scanner(){
            this.$router.push("/scan").catch(err => {err})
        },
        logout(){
          this.$store.commit('logout')
          this.$router.push("/").catch(err => {err})
        },
        videos(){
          this.$router.push("/videos").catch(err => {err})
        }
    }
  }
</script>

