<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="mt-4 flex items-start">
        <div>
          <div class="text-2xl font-normal text-indigo-600">
            <a href="/">vform</a>
          </div>
          <div class="mt-1 dark:text-gray-300">
            Handle Laravel-Vue forms and validation with ease.
          </div>
        </div>

        <ToggleTheme class="ml-auto my-auto" />
      </div>

      <Badges class="mt-2" />

      <div class="grid grid-cols-4 gap-5 mt-10">
        <div class="col-span-1">
          <Navigation />
        </div>

        <div class="col-span-3">
          <Demo class="mb-4" />

          <div class="panel">
            <Docs />
          </div>
        </div>
      </div>

      <div class="text-center py-4 text-gray-400">
        Created by <a href="https://github.com/cretueusebiu" target="_blank">Cretu Eusebiu</a> ✌
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Docs from './../../docs.md'
import Demo from './components/Demo.vue'
import Badges from './components/Badges.vue'
import Navigation from './components/Navigation.vue'
import ToggleTheme from './components/ToggleTheme.vue'

export default {
  name: 'App',

  components: {
    Docs,
    Demo,
    Badges,
    Navigation,
    ToggleTheme
  }
}
</script>
