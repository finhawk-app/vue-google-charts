<template>

  <template v-for="(chartDef, index) in chartDefs"
    :key="index"
  >
    <g-chart-single
      :chartDef="chartDef"
      :chartsLib="chartsLib"
      :googleChartsLoaded="googleChartsLoaded"
      :showXAxis="index === chartDefs.length - 1"
    >
    </g-chart-single>
  </template>

</template>

<script>
import { ChartCommonSettings } from './GChartCommon.js';
import GChartSingle from './GChartSingle.vue';
import loadGoogleCharts from '../lib/google-charts-loader'
import debounce from 'debounce'
let chartsLib = null;

export default {
  name: 'GChart',

  props: {
    chartDefs: {
      type: Array
    },
    chartCommonSettings: {
      type: ChartCommonSettings
    }
  },
  data() {
    return {
      googleChartsLoaded: false
    }
  },
  components: {
    GChartSingle: 'g-chart-single'
  },
  mounted () {
    loadGoogleCharts(this.version, this.settings).then(api => {
      chartsLib = api;
      this.googleChartsLoaded = true;
    })
  }
}

</script>
