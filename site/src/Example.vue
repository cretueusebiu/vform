<template>
  <div>
    this is an Examples
    <button @click="click">
      click
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      alert('clicked')
    }
  }
}
</script>
