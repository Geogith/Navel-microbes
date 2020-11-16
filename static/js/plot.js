var microbes = {
  x: [
    "OTU 1167",
    "OTU 2859",
    "OTU 482",
    "OTU 2264",
    "OTU 41",
    "OTU 1189",
    "OTU 352",
    "OTU 189",
    "OTU 2318",
    "OTU 1977",
  ],

  y: [155, 125, 119, 75, 65, 50, 49, 47, 46, 45],

  type: "bar",
};

var data = [microbes];

var data = [
  {
    type: "bar",
    x: [45, 46, 47, 49, 50, 65, 75, 119, 125, 155],

    y: [
      "OTU 1977",
      "OTU 2318",
      "OTU 189",
      "OTU 352",
      "OTU 1189",
      "OTU 41",
      "OTU 2264",
      "OTU 482",
      "OTU 2859",
      "OTU 1167",
    ],
    orientation: "h",
  },
];

// Layout provides title to chart, font, and hovertext for chart;
var layout = {
  title: "'Horizontal Bar' Chart",
  font: {
    family: "Raleway, sans-serif",
  },
  showlegend: false,
  xaxis: {
    tickangle: -45,
  },
  yaxis: {
    zeroline: false,
    gridwidth: 2,
  },
  bargap: 0.05,
};

// Plotly.newPlot('myDiv', data, layout);
Plotly.newPlot("horizontalbar-plot", data, layout);
