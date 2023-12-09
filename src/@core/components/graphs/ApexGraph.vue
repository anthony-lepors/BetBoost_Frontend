<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import { parse, format } from 'date-fns';

const vuetifyTheme = useTheme()

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const chartConfig = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  const parsedDates = props.categories.map(date => parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()));
  const formattedDates = parsedDates.map(date => format(date, 'dd MMM yyyy HH:mm'));

  const minProfit = Math.min(...props.data) - 10;
  const maxProfit = Math.max(...props.data) + 10;

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor,
      padding: {
        left: 10,
        top: -20,
        right: 10,
        bottom: 0,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.25,
        opacityFrom: 0.5,
        stops: [
          0,
          95,
          100,
        ],
        shadeIntensity: 0.6,
        colorStops: [[
          {
            offset: 0,
            opacity: 0.4,
            color: currentTheme.primary,
          },
          {
            offset: 100,
            opacity: 0.2,
            color: currentTheme.surface,
          },
        ]],
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: currentTheme.primary,
      },
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: formattedDates,
      labels: {
        show: false,
        // style: {
        //   fontSize: '14px',
        //   colors: disabledTextColor,
        //   fontFamily: 'Public Sans',
        // },
      },
    },
    yaxis: {
      min: minProfit,
      max: maxProfit,
      show: true,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${Math.round(value)}€`, // Ajoutez le symbole €
        style: {
          fontSize: '14px',
          colors: disabledTextColor,
          fontFamily: 'Public Sans',
        },
      },
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      hover: { size: 8 },
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 8,
        seriesIndex: 0,
        fillColor: '#fff',
        strokeColor: currentTheme.primary,
        dataPointIndex: props.data.length - 1,
      }],
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value) => `${Math.round(value)}€`,
        title: {
          formatter: () => 'Benefices',
        },
      },
      marker: { show: false },
    },
  }
})
</script>

<template>
    <!-- <VCardText>
      <VueApexCharts
        type="area"
        :height="400"
        :options="chartConfig"
        :series="series[currentTab]"
      />
    </VCardText> -->
    <VCardText>
      <VueApexCharts
        type="area"
        :height="400"
        :options="chartConfig"
        :series="[{
        data: props.data,
      }]"
      />
    </VCardText>
</template>