var gaugeOptions = {
  chart: {
    type: 'solidgauge'
  },

  title: null,

  pane: {
    center: ['50%', '100%'],
    size: "180%",
    startAngle: -90,
    endAngle: 90,
    innerSize: 1,
    background: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
      innerRadius: "60%",
      outerRadius: "100%",
      shape: 'arc'
    }
  },

  exporting: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, '#32a4f5'],
      [0.2, '#32a4f5'],
      [0.3, '#32a4f5'],
      [0.4, '#32a4f5'],
      [0.5, '#32a4f5'],
      [0.6, '#32a4f5'],
      [0.7, '#f00'],
      [0.8, '#f00'],
      [0.9, '#f00'],
    ],
    lineWidth: 0,
    tickWidth: 0,
    tickInterval: 0,
    minorTickInterval: null,
    // tickAmount: false,
    title: {
      y: -70
    },
    labels: {
      y: 16
    }
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    }
  }
};


const initGuageMeter = (elementId, min, max, currentValue, gaugeOptions) => {
  Highcharts.chart(elementId, Highcharts.merge(gaugeOptions, {
    yAxis: {
      min: min ? min : 0,
      max,
      title: {
        text: `${max / 2}kva`,
        y: -26
      },
      labels: {
        align: "center",
        format: `{value}kva`,
        y: 0,
        x: 3,
        style: {
          color: "#1c1c1c",
        },
        distance: 18
      }
    },

    credits: {
      enabled: false
    },

    series: [{
      name: 'KVA',
      data: [currentValue],
      dataLabels: {
        y: 1,
        format:
          `<div style="text-align:center;">
            <span style="font-size:10px; color: #1c1c1c;">{y} kva</span>
          </div>`
      },
      tooltip: {
        valueSuffix: ' km/h'
      }
    }]

  }));
}


const initBar = () => {
  const bars = document.querySelectorAll('.bar');

  bars.forEach((el, index) => {
    const value = +el.getAttribute("data-value");
    const max = +el.getAttribute("data-max");
    const percentageValue = (value * 100) / max;

    const bgColor = percentageValue >= 60 ? 'red' : '#00a400'

    const progresBar = document.createElement("div");
    progresBar.classList.add("progress");
    progresBar.style.height = `${percentageValue}%`;
    progresBar.style.backgroundColor = bgColor;
    if (percentageValue >= 60) el.classList.add("danger-border")

    el.appendChild(progresBar);
  })
}


const min = 0;
const max = 1000;
const current = 80;
const elementId = 'container-speed'
initGuageMeter(elementId, min, max, current, gaugeOptions);
initBar()