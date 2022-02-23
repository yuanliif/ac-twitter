<template>
  <svg class="svg-icon">
    <use :xlink:href="`#svg-icon-${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>
