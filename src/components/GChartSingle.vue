<template lang="html">
  <div ref="chart"></div>
</template>

<script>

import { ChartDef } from './GChartCommon.js';

export default {
  name: 'GChartSingle',
  props: {
    chartDef: {
      type: ChartDef
    },
    chartsLib,
    googleChartsLoaded: {
      type: Boolean,
      default: false
    },
    showXAxis: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      chartObject: null
    }
  },

  watch: {
    googleChartsLoaded(val) {
      if(val === true) {
        const chart = this.createChartObject()
        this.$emit('ready', chart, api)
        this.drawChart();
      }
    },
    showXAxis(val) {
      if(val === false) {
        this.chartDef.options['hAxis'] = {
          textPosition: 'none'
        };
      }
    },
    'chartDef.data': {
      deep: true,
      handler () {
        this.drawChart()
      }
    },
    'chartDef.options': {
      deep: true,
      handler () {
        this.drawChart()
      }
    },
    'chartDef.type' (value) {
      this.createChartObject()
      this.drawChart()
    }
  },

  mounted () {
    if (this.resizeDebounce > 0) {
      window.addEventListener('resize', debounce(this.drawChart, this.resizeDebounce));
    }
  },

  beforeDestroy () {
    if (this.chartObject) {
      this.chartObject.clearChart()
    }
  },
  methods: {
    drawChart() {
      if (!this.chartsLib || !this.chartObject) return
      const data = this.getValidChartData()
      if (data) this.chartObject.draw(data, this.options)
    },
    getValidChartData () {
      if (this.data instanceof this.chartsLib.visualization.DataTable) return this.data
      if (this.data instanceof this.chartsLib.visualization.DataView) return this.data
      if (Array.isArray(this.data)) return this.chartsLib.visualization.arrayToDataTable(this.data)
      if (this.data !== null && typeof this.data === 'object') return new this.chartsLib.visualization.DataTable(this.data)
      return null
    },

    createChartObject () {
      const createChart = (el, google, type) => {
        if (!type) throw new Error('please, provide chart type property')
        return new google.visualization[type](el)
      }
      const fn = this.createChart || createChart
      this.chartObject = fn(this.$refs.chart, this.chartsLib, this.type)
      this.attachListeners()
      return this.chartObject
    },

    attachListeners () {
      if (!this.events) return
      Object.entries(this.events).forEach(([event, listener]) => {
        this.chartsLib.visualization.events.addListener(this.chartObject, event, listener)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
