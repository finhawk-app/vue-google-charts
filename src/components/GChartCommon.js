export class ChartDef {
  constructor() {
    this.type = '';
    this.data = [];
    this.options = {};
    this.events = null;
    this.createChart = null;
    this.resizeDebounce = 200;
  }
}

export class ChartCommonSettings {
  constructor() {
    this.settings = {
      packages: ['corechart', 'table']
    };
    this.version = 'current';
  }
}
