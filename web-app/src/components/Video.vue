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

        <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="name in names">
        <v-col
          :key="name"
          cols="12"
          md="2"
          @click="go_to_video()"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="`https://rwm-videos.s3.amazonaws.com/${book}/${name}/picture/${name}.jpg`"
                height="225px"
              >
                <v-card-title class="title white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
          <p>{{name}}</p>
        </v-col>
      </template>
    </v-row>
  </v-container>

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
      sent: false,
      hover: false,
      names: [
        'Bill Mines',
        'Holden Malinchock',
        'John Long'
      ],
      book: '69e7a3bfd950f20775821027c976f398'
    }),
    methods: {
        go_to_login(){
          this.$router.push("/login").catch(err => {err})
          this.$store.commit('increment')
          console.log(this.$store.state.count) // -> 1
        },
        go_to_home(){
          this.$router.push("/").catch(err => {err})
        },
        go_to_video(){
          console.log('GO TO VIDEO!')
        }
    }
  }
</script>

