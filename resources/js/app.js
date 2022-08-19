/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex'

import PokemonApi from "./store/modules/PokemonApi";

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    PokemonApi
  }
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./components', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('fm-menu', require('./components/organisms/FmMenu.vue').default);
Vue.component('pokedex-list', require('./modules/pokedex/views/List.vue').default);
Vue.component('pokedex-profile', require('./modules/pokedex/views/Profile.vue').default);

Vue.filter('idNormalizer', (val) => {
  return '#'+val.toString().padStart(3, '0')
})
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
});
