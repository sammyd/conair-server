google.load('visualization', '1');
google.setOnLoadCallback(getHistoricalData);


function getHistoricalData()
{
    var start = new Date(2012,8,15);
    var stop = new Date();
    var step = 5 * 60 * 1000; // 5 minutes
    d3.json("/data/?start=" + start.toISOString()
    + "&stop=" + stop.toISOString()
    + "&step=" + step, function(data) {
        if(!data) return;
        drawVisualisation(data, start, step);
    });
}

function drawVisualisation(data, startTime, step)
{
    // enrich data with timestamps 
    var data = buildTable(data, startTime.getTime(), step);

    var wrapper = new google.visualization.ChartWrapper({
               chartType: 'AnnotatedTimeLine',
               dataTable: data,
               options: {'displayAnnotation': 'true', 'scaleType': 'maximized'},
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
    data.addColumn('datetime','Date');
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
