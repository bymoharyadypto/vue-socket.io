<template>
  <div>
    <h1>Home Page</h1>
    <h3>Hi.. {{ username }}! Have fun in the chat</h3>
    <div style="boder-style: double">
      <div v-for="(chat, index) in chatMessages" :key="chat.message + index">
        <p>
          <strong>{{ chat.username }}</strong>
        </p>
        <p>{{ chat.message }}</p>
      </div>
    </div>
    <textarea cols="30" rows="1" v-model="message" @keyup.enter="handleChat"></textarea><br />
    <br /><button>Send</button>
  </div>
</template>

<script>
export default {
  name: 'HomeVue',
  data() {
    return {
      message: '',
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    chatMessages() {
      return this.$store.state.chatMessages;
    },
  },
  methods: {
    handleChat() {
      this.$store.dispatch('sendChatEventToServer', this.message);
      this.message = '';
    },
  },
  created() {
    this.$store.commit('SET_USERNAME', localStorage.getItem('username'));
  },
};
</script>
