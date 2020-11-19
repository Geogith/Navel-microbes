// Used D3 to read samples.json File
// Used prettify to format data to be visibly readable in rows

function naval(ids) {
  d3.json("samples.json").then((microb) => {
    var metadata = microb.metadata;
    var filterdata = metadata.filter((sample) => sample.id == ids);

    var bio = d3.select("#sample-metadata");
    bio.html("");
    Object.entries(filterdata[0]).forEach(([key, value]) => {
      bio.append("h5").text(`${key}: ${value}`);
    });
  });
}

// This function was inserted to help with plotting sample_values and otu_ids for horizontal bar:

function compareseccolumn(a, b) {
  if (a[1] == b[1]) {
    return 0;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}

function optionChanged(val) {
  var dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var bellybutton = data.names;
    bellybutton.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });

    var tracker = [];
    var metaindex = [0];

    data.samples.forEach((sample, index) => {
      if (sample.id == val) {
        tracker = sample;
        metaindex = index;
      }
    });

    console.log(tracker);

    var id_1 = bellybutton[metaindex];
    naval(id_1);

    // These variables were created to help control the size and color of the bubbles:

    var barxvalues = [];
    var baryvalues = [];
    var bubblexvalues = [];
    var bubbleyvalues = [];
    var hovertext = [];
    var bubblecolors = [];

    for (var i = 0; i < tracker.sample_values.length; i++) {
      barxvalues.push(tracker.sample_values[i]);
      baryvalues.push("OTU " + tracker.otu_ids[i]);
      bubblexvalues.push(tracker.otu_ids[i]);
      bubbleyvalues.push(tracker.sample_values[i]);
      hovertext.push(tracker.otu_labels[i]);

      // This if statement was created to change the color of the bubble depending on otu_ids:

      if (tracker.otu_ids[i] < 1000) {
        bubblecolors.push("rgb(93, 164, 214)");
      } else if (tracker.otu_ids[i] < 2000) {
        bubblecolors.push("rgb(255, 144, 14)");
      } else if (tracker.otu_ids[i] < 3000) {
        bubblecolors.push("rgb(44, 160, 101)");
      } else {
        bubblecolors.push("rgb(255, 65, 54)");
      }
    }

    // Console.log to test bubblecolors before going forward in writing additional code:

    console.log(bubblecolors);

    var bar_chart = document.getElementById("bar");

    //                                                                        Created horizontal bar chart:

    var graphdata = [
      {
        type: "bar",
        x: barxvalues.slice(0, 10).reverse(),
        y: baryvalues.slice(0, 10).reverse(),
        hovertext: hovertext.slice(0, 10).reverse(),

        orientation: "h",
        marker: {
          color: "rgba(55,128,191,0.6)",
          width: 1,
        },
      },
    ];

    var layout = {
      title: "Belly",
    };

    //                                                                         Create bubble chart

    var trace1 = {
      x: bubblexvalues,
      y: bubbleyvalues,
      mode: "markers",
      marker: {
        color: bubblecolors,
        size: bubbleyvalues,
      },
    };

    var bubbledata = [trace1];

    var bubblelayout = {
      title: "Marker Size and Color",
      showlegend: false,
      height: 600,
      width: 1400,
    };

    // Plotly to print the plot:

    Plotly.newPlot("bar", graphdata, layout);
    Plotly.newPlot("bubble", bubbledata, bubblelayout);
  });
}

optionChanged(940);
