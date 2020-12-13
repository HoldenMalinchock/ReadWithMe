<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="primary"
      dark
    >
    <div class="header">
      <h1 v-on:click="go_to_home()">READ WITH ME</h1>
    </div>
      <v-spacer />
      <v-btn class="mx-2" color="primary" min-width=0  v-on:click="go_to_home()">Home</v-btn>
      <v-btn v-if="$store.state.username === null" color="primary" v-on:click="go_to_login()">Login</v-btn>
      <v-btn v-else color="primary" v-on:click="logout()">Logout</v-btn>
      <!-- This is an interesting feature I may want to use later <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    </v-app-bar>
     <v-card
        class="mx-auto"
        max-width="600"
        raised
        color="#737373"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{name}}</v-list-item-title>
            <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card-actions>
      <v-spacer></v-spacer>
      </v-card-actions>
    <v-card
      class="mx-auto"
      max-width="1000"
      raised
      elevation="16"
    >
    <v-list-item three-line>
      <v-list-item-content>
        <vue-core-video-player id="video" :src="`https://rwm-videos.s3.amazonaws.com/${book}/${name}/video/${name}.mp4`" @pause="pauseFunc($event)"></vue-core-video-player>

      </v-list-item-content>

    </v-list-item>
  </v-card>


    <v-footer
      color="primary"
      app
    >
      <v-spacer />

      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style  scoped>
  .header {
    font-family: Blippo, fantasy;
  }
</style>

<script>
  export default {
    name: 'VideosPage',
    data: () => ({
      drawer: null,
      data: null,
      sent: false,
      hover: false,
      name: '',
      names: [],
      book: '',
      description: '',
      paused: null,
      videoElement: null
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
        go_to_video(name){
          console.log("Loading Video")
          console.log(name)
        },
        playfunc(){
            console.log('Play')
            var v = document.getElementsByTagName("video")[0];
            v.addEventListener("seeked", function() { v.play(); }, true);
        },
        pauseFunc(){
          this.videoElement = event.target;
          this.videoElement.pause();

        },
        errorHandle(){
          console.log("Handling error")
        }
    },
    beforeMount() {
      this.names = JSON.parse(localStorage.getItem("name_list"));
      this.book = localStorage.book
      this.title  = localStorage.title
      this.description = localStorage.description
      this.thumbnail = localStorage.thumbnail
      this.name = localStorage.name
    },
  }
</script>

