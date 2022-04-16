const lineChart = {
  series: [
    [
      {
        name: "Vip room",
        data: [550, 40, 300, 220, 800, 250, 400, 130, 100],
        offsetY: 0,
      },
      {
        name: "Casual room",
        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
        offsetY: 0,
      },
    ],
    [
      {
        name: "Vip room",
        data: [50, 460, 150, 350, 100, 550, 100, 630, 500],
        offsetY: 0,
      },
      {
        name: "Casual room",
        data: [300, 290, 140, 40, 290, 290, 120, 530, 100],
        offsetY: 0,
      },
    ],
  ],

  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default lineChart;
