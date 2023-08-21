import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    chatMessages: [],
  },
  getters: {},
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SOCKET_CHATMESSAGESFROMSERVER(state, payload) {
      state.chatMessages = payload;
    },
  },
  actions: {
    socket_connect() {
      console.log('connected to server');
    },
    socket_disconnet() {
      console.log('diconnected to server');
    },
    socket_customeEventFromServer(_, payload) {
      console.log('customeEventFromServer ', payload);
    },
    sendCustomeEventToServer(_, payload) {
      console.log();
      this._vm.$socket.client.emit('customeEventFromClient', payload);
    },
    sendSignInEventToServer(context, payload) {
      context.commit('SET_USERNAME', payload);
      this._vm.$socket.client.emit('signInEventFromClient', payload);
    },
    sendChatEventToServer(context, payload) {
      this._vm.$socket.client.emit('chatEventFromClient', {
        username: this.state.username,
        message: payload.trim(),
      });
    },
  },
  modules: {},
});
