<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer />
      <v-btn class="mx-2" color="primary" min-width=0  v-on:click="go_to_home()">Home</v-btn>
      <v-btn v-if="$store.state.username === null" color="primary" v-on:click="go_to_login()">Login</v-btn>
      <v-btn v-else color="primary" v-on:click="logout()">Logout</v-btn>
      <!-- This is an interesting feature I may want to use later <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    </v-app-bar>

    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-toolbar flat>
        </v-toolbar>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="i in 6" :key="i" xs4>
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>

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
    name: 'VideosPage',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      data: null,
      sent: false
    }),
    methods: {
        go_to_login(){
          this.$router.push("/login").catch(err => {err})
          this.$store.commit('increment')
          console.log(this.$store.state.count) // -> 1
        },
        go_to_home(){
          this.$router.push("/").catch(err => {err})
        }
    }
  }
</script>

