<template>
  <v-app id="inspire">
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
                    label="Login"
                    name="username"
                    prepend-icon="person"
                    type="text"
                  />
                  <v-text-field
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
        var vm = this;
        console.log(this.username)
        console.log('testing123')
        this.axios.post('https://0vkhy4t6qe.execute-api.us-east-1.amazonaws.com/DEV/login', {
          username: vm.username,
          password: vm.password
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
        console.log('Request Made')
      }
    }
  }
</script>