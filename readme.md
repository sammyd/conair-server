# ConAir Server

ConAir server is a small sinatra web app which pulls the conair
environmental data uploaded to [TempoDB](http://www.tempodb.com/) using the
[ConAir](https://github.com/sammyd/conair) project and displays it.

We provide a public non-authenticated proxy with read access for the data (since
this is not an option within the current TempoDB authorisation model), and 2
javascript-based chart plots. One of the chart plots uses cubism and d3.js whilst the other
uses Google's chart plotting tools.

For a writeup on building this check out [this blog post](http://sammyd.github.com/blog/2012/09/16/visualising-conair-data-with-cubism-dot-js/).

This software comes with no guarantees at all. Use at your own risk.

It is running on heroku at [sl-conair.herokuapp.com](http://sl-conair.herokuapp.com/).

sam (@iwantmyrealname)
Dec 2012