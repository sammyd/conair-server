google.load('visualization', '1');
google.setOnLoadCallback(getHistoricalData);

function getHistoricalData()
{
    var start = new Date(2012,8,15);
    var stop = new Date();
    var step = 5 * 60 * 1000; // 5 minutes
    d3.json("/data/?start=" + start.toISOString() +
      "&stop=" + stop.toISOString() +
      "&step=" + step, function(data) {
        if(!data) return;
        drawVisualisation(data);
    });
}

function drawVisualisation(data)
{
    // enrich data with timestamps
    var tableData = buildTable(data);

    var wrapper = new google.visualization.ChartWrapper({
               chartType: 'AnnotatedTimeLine',
               dataTable: tableData,
               options: {'displayAnnotation': 'true', 'scaleType': 'maximized'},
               containerId: 'chart'
    });

    wrapper.draw();
}

// Assume that we have a ts property
function buildTable(typicalJSONData)
{
    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Date');
    data.addColumn('number', 'Temperature');

    typicalJSONData.forEach(function(element, index, array){
      date = new Date(element['ts']);
      data.addRow([date, element['temperature']]);
    });

    return data;
}
