<template>
  <nav aria-label="Navigation">
    <a v-for="item in items"
       :key="item.title"
       :href="`#${item.title.toLocaleLowerCase().replaceAll(' ', '-')}`"
       :class="[
         false ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
         item.sub ? '' : 'font-medium',
         'flex items-center px-3 py-2 rounded-md'
       ]"
    >
      <span class="truncate">
        {{ item.title }}
      </span>
    </a>
  </nav>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Getting Started' },
      { title: 'Installation', sub: true },
      { title: 'Basic Usage', sub: true },
      { title: 'Examples' }
    ]
  })
}
</script>
