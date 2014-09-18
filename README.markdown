# Agile Iteration Burndown Chart

A project that uses a couple of JS libraries ([Raphael](http://raphaeljs.com/)
 and [Morris.js](http://morrisjs.github.io/morris.js/)) to render a nice SVG burndown chart for Agile iterations.

Ideally the data it uses could be provided via an API, but for now it reads an HTML table that has daily totals of remaining story points.

## Demo
This branch currently has a demo that can be run as a [jsFiddle](http://jsfiddle.net/gh/get/jquery/1.8.3/YoungElPaso/Burndown-Chart/tree/master/demo), taking advantage of an interesting feature in jsFiddle that [allows you to run code from GitHub](http://doc.jsfiddle.net/use/github_read.html).

### Immediate TODO's
 * Create a working local copy (instead of just demo)
 * Add some sort of build process to generate parts of the demo - ie pull templates into demo files, css, js etc from source (Grunt copy might work)
