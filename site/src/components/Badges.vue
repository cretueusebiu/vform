<template>
  <div class="flex">
    <a v-for="(badge, index) in badges" :key="index" :href="badge.url" target="_blank" class="mr-2">
      <img :src="badge.image" :alt="badge.alt">
    </a>
  </div>
</template>

<script>
export default {
  data: () => ({
    badges: [
      { url: 'https://github.com/cretueusebiu/vform', image: 'https://img.shields.io/github/stars/cretueusebiu/vform?style=social', alt: 'GitHub Repo stars' },
      { url: 'https://npmjs.com/package/vform', image: 'https://img.shields.io/npm/v/vform.svg?style=flat-square', alt: 'Latest Version on NPM' },
      { url: 'https://github.com/cretueusebiu/vform/actions', image: 'https://github.com/cretueusebiu/vform/workflows/test/badge.svg', alt: 'Build Status' },
      { url: 'https://npmjs.com/package/vform', image: 'https://img.shields.io/npm/dt/vform.svg?style=flat-square', alt: 'Total Downloads' }
    ]
  })
}
</script>
