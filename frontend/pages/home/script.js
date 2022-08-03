var options = {
    series: [59, 80, 85, 75, 90],
    chart: {
        width: 380,
        type: 'polarArea'
    },
    labels: ['Eletroterapia', 'Termoterapia', 'Mecanoterapia', 'Massoterapia.', 'Cinesioterapia'],
    fill: {
        opacity: 1
    },
    stroke: {
        width: 1,
        colors: undefined
    },
    yaxis: {
        show: false
    },
    legend: {
        position: 'bottom'
    },
    plotOptions: {
        polarArea: {
        rings: {
            strokeWidth: 0
        },
        spokes: {
            strokeWidth: 0
        },
        }
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var options2 = {
    series: [{
    name: 'Quantidade',
    data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31]
  }],
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '50%',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2
  },
  
  grid: {
    row: {
      colors: ['#fff', '#f2f2f2']
    }
  },
  xaxis: {
    labels: {
      rotate: -45
    },
    categories: [
        'Procedimento 1',
        'Procedimento 2',
        'Procedimento 3',
        'Procedimento 4',
        'Procedimento 5',
        'Procedimento 6',
        'Procedimento 7',
        'Procedimento 8',
        'Procedimento 9',
        'Procedimento 10',
    ],
    tickPlacement: 'on'
  },
  yaxis: {
    title: {
      text: 'Quantidade',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: "horizontal",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100]
    },
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart2"), options2);
  chart.render();