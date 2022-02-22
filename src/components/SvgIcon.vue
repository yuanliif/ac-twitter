<template>
  <svg :class="['svg-icon', iconClass]">
    <use :xlink:href="`#svg-icon-${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: [String, Array],
      default: ''
    },
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>
