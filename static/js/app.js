// Since the data is a Json Data get the URL
url = "samples.json"


// Initializes the page with Default to select subject ID
function init() {
    // Use D3 to select the dropdown menu
    
    var dropdownMenu = d3.select("#selDataset");

    // Use d3 to get the data from URL.
    d3.json(url).then (function (data){
        console.log(data);

        // Create a variable for Name which has subject ID
        var sampleData = data.names;
        console.log(sampleData);
        
        // Append to the dropdown menu using for loop
        for (var i=0; i < 156; i++) {
        toption = dropdownMenu.append("option");
        toption.text(sampleData[i])
        toption.property("value", sampleData[i]);
        };
        
    });

    // buildtable();
    // plotbar();
    // plotbubble();
    // buildGauge();
};


// Create a function to handle the change in the dropdown box
function optionChanged(newID) {
    
    
    buildtable(newID);
    plotbar(newID);
    plotbubble(newID);
    buildGauge(newID);
    
}

// create a function for pulling the metadata for Subject ID
function buildtable(ID) {
    // d3.selectAll("#sample-metadata").value="";
    // Use d3 to get the data from URL.
    d3.json(url).then(function(data) {
    console.log

      // Grab values from the response json object to Build Table
      var metadata = data.metadata;
      console.log(metadata);

      //  Use filter to filter Meta data by Subject ID in the Metadata
      //  and setting it to a new variable
      var metaFilter = metadata.filter(row => row.id == ID);
      console.log(metaFilter)
        
      // for the Filtered data set the index to 0 
      // since we will always be picking data for 1 subject ID 
      // that is selected in the dropdown menu
      var finaldata = metaFilter[0];
      console.log(finaldata)

      //clear the values
      var list1 = d3.selectAll("#sample-metadata");

      // Clear the HTML List so it dont show up multiple time
      list1.html("");
        // list1."sample-metadata"("")

      //  Loop through keys and values and use arrow method  
      //  to append it to the page using  
      Object.entries(finaldata).forEach(([key, value]) => {
        list1.append("h6").text(key + ': ' + value); 
      })
      
   });
   
};


/////////////////////////////////////////////////////////////////////////////////

// Create a function to plot barchart
function plotbar(ID) {
// Use d3 to get the data from URL.
    d3.json(url).then (function (data){

        // Grab values (sample dataset) from the response json object to graph
        var sampledata = data.samples;
        console.log(sampledata)

        //  Use filter to filter SampleData by Subject ID (id) in the Samples dataset
        //  and setting it to a new variable
        var sampleFilter = sampledata.filter(row => row.id == ID);
        console.log(sampleFilter);

        // for the Filtered data above set the index to 0 
        // since we will always be picking data for 1 subject ID 
        // that is selected in the dropdown menu
        var finalsample = sampleFilter[0];
        console.log(finalsample);

        // Get sample_values from the samples dataset
        // use Slice to get the first 10 values and reverse the values
        var sampleValues = finalsample.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);
        

        // Get otu_ids from the samples dataset
        // use Slice to get the first 10 values and reverse the values
        // use Map to add otu in front of the out_ids
        var otuIDs = finalsample.otu_ids.slice(0, 10).reverse();
        console.log(otuIDs);
        var outid1 = otuIDs.map(row => "OTU" + row)

        // Get otu_labels from the samples dataset
        // use Slice to get the first 10 values and reverse the values
        var otuLabels = finalsample.otu_labels.slice(0, 10).reverse();
        console.log(otuLabels.reverse());
        

        // var sampleID = finalsample.id.slice(0, 10);
        // console.log(sampleID);


        // Create Bar Chart from the above data//////

        var trace1 = {
        
            x: sampleValues,
            y: outid1,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }
        var data = [trace1];
    
        var layout = {
            title: "OTU - Top 10",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 75,
                r: 100,
                t: 100,
                b: 100
            }
        };

    Plotly.newPlot("bar", data, layout);
    });
};

// Create a function to plot barchart
function plotbubble(ID) {

    d3.json(url).then (function (data){ 

        // Grab values (sample dataset) from the response json object to graph
        var sampledata = data.samples;
        console.log(sampledata)

        //  Use filter to filter SampleData by Subject ID (id) in the Samples dataset
        //  and setting it to a new variable
        var filterdata = sampledata.filter(row => row.id == ID);
        console.log(filterdata);

        // for the Filtered data above set the index to 0 
        // since we will always be picking data for 1 subject ID 
        // that is selected in the dropdown menu
        var finalfilterdata = filterdata[0];
        console.log(finalfilterdata);

    //////// Create Bubble Chart /////////
    
        // Get sample_values from the samples dataset using filtered data
        var sampleValue2 = finalfilterdata.sample_values;
        console.log(sampleValue2);
    
        // Get out_ids from the samples dataset using filtered data
        var OtuIDs = finalfilterdata.otu_ids;
        console.log(OtuIDs);

        // Get out_labels from the samples dataset using filtered data
        var otulabels = finalfilterdata.otu_labels;
        console.log(otulabels)

        // Create a bubble chart
        
        trace2 = {
            x: OtuIDs,
            y:sampleValue2,
            mode: "markers",
        
            marker: {
                size: sampleValue2,
                color: OtuIDs
            },
            text:otulabels
        };

        data1 = [trace2];

        // set the layout for the bubble plot
        var layout1 = {
            xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
        };

        Plotly.newPlot("bubble", data1, layout1)
    });  
    
};

// create a function for pulling the metadata for Subject ID
function buildGauge(ID) {
    
    // Use d3 to get the data from URL.
    d3.json(url).then(function(data) {
    console.log(data);


      // Grab values from the response json object to Build Table
      var metadata = data.metadata;
      console.log(metadata);

      //  Use filter to filter Meta data by Subject ID in the Metadata
      //  and setting it to a new variable
      var metaFilter = metadata.filter(row => row.id == ID);
      console.log(metaFilter)

      // for the Filtered data set the index to 0 
      // since we will always be picking data for 1 subject ID 
      // that is selected in the dropdown menu
      var finaldata = metaFilter[0];
      console.log(finaldata)
    
      var washData = finaldata.wfreq;
      console.log(washData);
       
    
      var data3 = [
    
        {
        type: "indicator",
        mode: "gauge+number+needle",
        value: washData,
        title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
        
        // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "yellow"},
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "#F1F7E9", labels: "0-1"},
                { range: [1, 2], color: "#E0EECE" },
                { range: [2, 3], color: "#D8EAC0" },
                { range: [3, 4], color: "#C9E2A8" },
                { range: [4, 5], color: "#C1DD9B" },
                { range: [5, 6], color: "#A2CD69" },
                { range: [6, 7], color: "#92C450" },
                { range: [7, 8], color: "#86BB3F" },
                { range: [8, 9], color: "#709D35" },
                
            ],
            labels:["0-1", "1-2"],
            
            needle: {
                // Needle circle radius as the percentage of the chart area width
                radiusPercentage: 5,
                // Needle width as the percentage of the chart area width
                widthPercentage: 5,
                // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                lengthPercentage: 100,
                // The color of the needle
                color: 'rgba(0, 0, 0, 1)'
              }
        
        }
    }
  ];
  
  var layout3 = {
    width: 470,
    height: 400,
    margin: { t: 15, r: 15, l: 15, b: 15 },
    // paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data3, layout3);
    });
};

// initialize the init function
init();





