google.load('visualization', '1');
google.setOnLoadCallback(drawVisualization);


d3.json("/data/?start=" + start.toISOString()
    + "&stop=" + stop.toISOString()
    + "&step=" + step, function(data) {
        if(!data) return;
        drawVisualisation(data.map(function(d) { return d.value; }));
    });


function drawVisualization(data)
{

    var typicalJSONData = [{"value":21.981154819143967},{"value":22.00049286768727},{"value":21.98330116592362},{"value":22.011239453378487}];

    // enrich data with timestamps 
    var data = buildTable(typicalJSONData,new Date().getTime(),2 * 60 * 1000);

    var wrapper = new google.visualization.ChartWrapper({
               chartType: 'AnnotatedTimeLine',
               dataTable: data,
               options: {'displayAnnotation': 'true'},
               containerId: 'chart'
    });

    wrapper.draw();
}

// convert temperature data into google table with timestamp column.
// for more series add another 'number' column.
function buildTable(typicalJSONData,startMilli,stepMilli)
{

    var data = new google.visualization.DataTable();
    var eventTime = new Date(startMilli);

    // add timestamps
    for (var key in typicalJSONData)
    {
       if (typicalJSONData.hasOwnProperty(key))
       {
           typicalJSONData[key].date = eventTime;
           eventTime  = new Date(eventTime.getTime() + stepMilli);
       }
    }

    // convert to google table
    data.addColumn('date','Date');
    data.addColumn('number','Temperature');

    for (var key in typicalJSONData)
    {
       if (typicalJSONData.hasOwnProperty(key))
       {
           data.addRow([typicalJSONData[key].date,typicalJSONData[key].value]);
       }
    }

    return data;
}
