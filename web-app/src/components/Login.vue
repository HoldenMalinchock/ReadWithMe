<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>Read With Me</v-toolbar-title>
      <v-spacer />
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
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model = "username"
                    label="Login"
                    name="username"
                    prepend-icon="person"
                    type="text"
                  />
                  <v-text-field
                    v-model = "password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" v-on:click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      username: "",
      password: ""
    }),
    methods: {
      login(){
        var vm = this
        this.axios.post('https://0vkhy4t6qe.execute-api.us-east-1.amazonaws.com/DEV/login', {
          username: vm.username,
          password: vm.password
        })
        .then((response) => {
          // We want to push to a new page here
          console.log(response);
          // We need to check for more than a 200 status! Check for success message
          if (response.status == 200){
            // Here we want to send user data to the store and store them
            var user = vm.username
            var pass = vm.password
            vm.$store.commit('login', {user, pass})
            // Printing temperary to make sure it is working
            console.log(vm.$store.state.username)
            console.log(vm.$store.state.password)
            // Take you back to the main page
            // NOT TAKING YOU BACK FOR SOME REASON
            vm.$router.push("/").catch(err => {err})
          } 
        }, (error) => {
          console.log(error);
        });
        console.log('Request Made')
      }
    }
  }
</script>