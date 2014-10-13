Weather-Project
===============
<p>To install & run:</p>
<ul>
	<li>git clone https://github.com/goyergeek/Weather-Project.git</li>
	<li>npm install</li>
	<li>create NOAAtoken.js file in the routes folder</li>
		<pre>var NOAAtoken = "your token here";
		module.exports.NOAAtoken = NOAAtoken;</pre>
	 <li>node app.js</li>

<p> Web App project that will retrieve, format, retain, and display data retrieved from NOAA NCDC web api. </p>

<p>To Be Done:</p>
<ul>
<li>Build NCDC Web API Interface to retrieve data</li>
<li>Build out local retention database for several stations.</li>
<li>Build Web App Framework: node.js, express, jade, stylus</li>
<li>Create graphing app to return various graphs based on data</li>
</ul>

<p>In order to retrieve data you must get a token for access to the API.  Token can be obtained from: </br>
NOAA at the following URL: http://www.ncdc.noaa.gov/cdo-web/token</p>
