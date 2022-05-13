import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import alertPlagin from "@/plagins/alert.plagin";
import Loader from "@/components/Loader";
import currency from "@/filters/currency";
import date from "@/filters/date";
import tooltip from "@/directives/tooltip";

import {authFirebase} from "@/utils/firebase.config";
import {onAuthStateChanged } from 'firebase/auth';
import 'firebase/database';

import './registerServiceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/index.css';

let app;

onAuthStateChanged(authFirebase,() => {
  if (!app) {
    app = createApp(App)
      .component('Loader', Loader)
      .use(store)
      .use(router)
      .use(alertPlagin)
      .use(currency)
      .use(date)
      .directive('tooltip', tooltip)
      .mount('#app')
  }
})

