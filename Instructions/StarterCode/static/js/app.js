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

function main() {
  var dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var bellybutton = data.names;
    bellybutton.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });
    var id_1 = bellybutton[0];
    naval(id_1);
  });
}

main();
