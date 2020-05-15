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

    <v-card
      class="mx-auto"
      max-width="1000"
      raised
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
      name: '',
      book: '69e7a3bfd950f20775821027c976f398',
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
          console.log("Trying to Pause")
          // var v = document.querySelector("video");
          // v.addEventListener("pause", function() { v.pause(); }, true);
          this.videoElement = event.target;
          this.videoElement.pause();

        },
        errorHandle(){
          console.log("Handling error")
        }
    },
    beforeMount() {
            console.log('Assign Name')
            this.name = this.$route.params.name;
        },
  }
</script>

