<template>
  <div>
    <h1>Sign In Page</h1>
    <form @submit.prevent="handleSubmit">
      <label>Username</label><br />
      <input type="text" v-model="username" /><br />
      <br /><input type="submit" value="Sign In" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
    };
  },
  methods: {
    handleSubmit() {
      localStorage.setItem('username', this.username);
      this.$store.dispatch('sendSignInEventToServer', this.username);
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
