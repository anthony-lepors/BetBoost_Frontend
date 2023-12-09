<script setup>
const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

const emits = defineEmits();

const handleItemClick = () => {
    emits('action'); // Émet un événement personnalisé vers le parent
  };
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable }"
    @click="handleItemClick"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      :to="item.to"
      :href="item.href"
    >
      <VIcon v-if="item.icon"
        :icon="item.icon"
        class="nav-item-icon"
      />
      <VImg v-else-if="item.img"
        :width="6"
        :src="item.img"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ item.title }}
      </span>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
