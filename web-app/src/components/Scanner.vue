<template>
  <v-app id="inspire" color="gray">

    <v-app-bar
      app
      color="cyan"
      dark
    >
      <v-spacer />
      <v-btn class="mx-2" color="primary" min-width=0  v-on:click="go_to_login()">SCAN PAGE</v-btn>
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
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <div class="scanner_wrapper">
                    <button @click="stop">Stop</button>
                    <div ref="quagga" class="camera"/>
                    <pre v-if="data">
                    {{ data }}
                    </pre>
                </div>
                </v-btn>
              </template>

              <span>Source</span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/WVbPgz"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>

              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      color="cyan"
      app
    >
      <v-spacer />

      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Quagga from 'quagga'
  export default {
    name: 'LayoutsDemosBaselineFlipped',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      data: null
    }),
    mounted() {
        this.$nextTick(() => {
      Quagga.init({
          inputStream : {
          name : "Live",
          type : "LiveStream",
          target: this.$refs.quagga
        },
        decoder : {
          readers : [{
                format: "ean_reader",
                config: {
                    supplements: [
                        'ean_5_reader', 'ean_2_reader'
                    ]
                }
            }],
          debug: {
            drawBoundingBox: false,
          }
        }
      },
      () => this.start())
    })
    },
    methods: {
        go_to_login(){

            this.$router.push("/login").catch(err => {err})
            this.$store.commit('increment')
            console.log(this.$store.state.count) // -> 1
        },
        start() { 
            Quagga.onDetected(this.onDetected)
            Quagga.start() 
            console.log('Quagga started!')
        },
        onDetected(data) {
            console.log('Found a barcode')
            this.data = data
            console.log(this.data)
        },
        stop() {
            Quagga.offDetected(this.onDetected)
            Quagga.stop()
            this.$refs.quagga.querySelector('video').remove()
            this.$refs.quagga.querySelector('canvas').remove()
        }
    }
  }
</script>

