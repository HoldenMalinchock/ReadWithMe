<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="primary"
      dark
    >
    <div class="header">
      <h1>READ WITH ME</h1>
    </div>
      <v-spacer />
      <v-btn class="mx-2" color="primary" min-width=0  v-on:click="go_to_home()">Home</v-btn>
      <v-btn v-if="$store.state.username === null" color="primary" v-on:click="go_to_login()">Login</v-btn>
      <v-btn v-else color="primary" v-on:click="logout()">Logout</v-btn>
      <!-- This is an interesting feature I may want to use later <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    </v-app-bar>

    <v-content>
      <v-card
      class="mx-auto"
      max-width="700"
      max-height="700"
      raised
      >
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <div class="scanner_wrapper">
              <v-card-title  class="justify-center">Scan A Book</v-card-title>
              <v-btn class="my-2" color="primary" @click="stop">Stop</v-btn>
              <div ref="quagga" class="camera"/>
            </div>

          </v-col>
        </v-row>
      </v-container>
      </v-card>
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

<style  scoped>
  .header {
    font-family: Blippo, fantasy;
  }
</style>

<script>
  //https://github.com/serratus/quaggaJS/issues/116
  import Quagga from 'quagga'
  import isbn from 'isbn-validate'
  export default {
    name: 'LayoutsDemosBaselineFlipped',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      data: null,
      sent: false,
      names: [],
      book: '',
      tile: '',
      description: '',
      thumbnail: ''
    }),
    mounted() {
        this.$nextTick(() => {
      Quagga.init({
          inputStream : {
          name : "Live",
          type : "LiveStream",
          target: this.$refs.quagga
        },
        decoder: {
            readers: ["ean_reader", "upc_reader"],
            debug: {
              drawBoundingBox: false
            }
          }
      },
      () => this.start())
    })
    },
    methods: {
        go_to_login(){
          Quagga.stop()
          this.$router.push("/login").catch(err => {err})
          this.$store.commit('increment')
          console.log(this.$store.state.count) // -> 1
        },
        go_to_home(){
          Quagga.stop()
          this.$router.push("/").catch(err => {err})
        },
        start() {
            Quagga.onDetected(this.onDetected)
            Quagga.start() 
            console.log('Quagga started!')
        },
        onDetected(data) {
            this.data = data
            //console.log((this.data.codeResult.code).toString())

            //console.log(isbn.Validate((this.data.codeResult.code).toString()))
            // Validate the ISBN with isbn-validate library.
            // First using Quagga to confirm it is ean then we use library to validate.
            if((this.data.codeResult.format).toString() == "ean_13"){
              if(isbn.Validate((this.data.codeResult.code).toString()) == true){
                var found_num = (this.data.codeResult.code).toString()
                if(found_num.charAt(0) == '9' && found_num.charAt(1) == '7', found_num.charAt(2) == '8'){
                  // CLOSE THE CAMERA
                  // I think I want to do a this.stop, but this causes home/login to break after clicking stop
                  if(this.sent == false){
                    // Here is where we want to make a aws post request.
                    // The way to not get stuck on an error here is, depening on return from aws flip sent var 
                    // Also display some visual to show it failed in some way.  
                    let self = this;
                    this.sent = true
                    //var vm = this
                    this.axios.post('https://0vkhy4t6qe.execute-api.us-east-1.amazonaws.com/DEV/getbook', {
                      //book_data: vm.data
                      book_data: found_num
                    })
                    .then((response) => {
                      console.log(response)
                      // We need to check for more than a 200 status! Check for success message
                      if (response.status == 200){
                        console.log("Book Found")
                        self.book = response.data.book_id
                        self.names = response.data.name_list
                        self.thumbnail = response.data.items[0].volumeInfo.imageLinks.thumbnail
                        self.title = response.data.items[0].volumeInfo.title
                        self.description = response.data.items[0].volumeInfo.description
                        self.$router.push({name: 'people', params: {book_id: self.book, name_list: self.names, thumb: self.thumbnail, title: self.title, desc: self.description}}).catch(err => {err})
                      } 
                    }, (error) => {
                      console.log(error);
                      this.sent = false
                    });
                  }
                }
              }
            }
            
        },
        stop() {
            Quagga.offDetected(this.onDetected)
            Quagga.stop()
            this.$refs.quagga.querySelector('video').remove()
            this.$refs.quagga.querySelector('canvas').remove()
        },
         logout(){
          this.$store.commit('logout')
          this.$router.push("/scan").catch(err => {err})
        }
    }
  }
</script>

