<template>
  <nav aria-label="Navigation">
    <a v-for="item in items"
       :key="item.title"
       :href="`#${item.title.toLocaleLowerCase().replaceAll(' ', '-')}`"
       class="flex items-center px-3 py-2 rounded-md transition-transform transform-gpu hover:translate-x-1 text-gray-600 dark:text-gray-300"
       :class="[item.sub ? '' : 'font-medium text-xl']"
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
      { title: 'Api' },
      { title: 'Form', sub: true },
      { title: 'Errors', sub: true },
      { title: 'Components' },
      { title: 'Bootstrap', sub: true },
      { title: 'Tailwind', sub: true },
      { title: 'Examples' },
      { title: 'File Upload', sub: true }
    ]
  })
}
</script>
