<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="mt-4 grid">
        <div class="text-2xl font-normal text-indigo-600">
          <a href="/">vform</a>
        </div>
        <div class="mt-1">
          A simple way to handle Laravel back-end validation in Vue.
        </div>
      </div>

      <div class="flex mt-2">
        <a v-for="(badge, index) in badges" :key="index" :href="badge.url" target="_blank" class="mr-2">
          <img :src="badge.image" :alt="badge.alt">
        </a>
      </div>

      <div class="grid grid-cols-4 gap-5 mt-10">
        <div class="col-span-1">
          <Navigation />
        </div>

        <div class="col-span-3 bg-white shadow-sm rounded-sm p-4">
          <Docs />
        </div>
      </div>

      <div class="text-center mt-4 text-gray-400">
        Created by <a href="https://github.com/cretueusebiu" target="_blank">Cretu Eusebiu</a> ✌
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Docs from './../../docs.md'
import Navigation from './Navigation.vue'

export default {
  name: 'App',

  components: {
    Docs,
    Navigation
  },

  data () {
    return {
      badges: [
        { url: 'https://github.com/cretueusebiu/vform', image: 'https://img.shields.io/github/stars/cretueusebiu/vform?style=social', alt: 'GitHub Repo stars' },
        { url: 'https://npmjs.com/package/vform', image: 'https://img.shields.io/npm/v/vform.svg?style=flat-square', alt: 'Latest Version on NPM' },
        { url: 'https://travis-ci.org/cretueusebiu/vform', image: 'https://img.shields.io/travis/cretueusebiu/vform/master.svg?style=flat-square', alt: '' },
        { url: 'https://travis-ci.org/cretueusebiu/vform', image: 'https://img.shields.io/travis/cretueusebiu/vform/master.svg?style=flat-square', alt: 'Build Status' },
        { url: 'https://npmjs.com/package/vform', image: 'https://img.shields.io/npm/dt/vform.svg?style=flat-square', alt: 'Total Downloads' }
      ]
    }
  }
}
</script>
