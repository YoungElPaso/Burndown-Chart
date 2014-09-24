// Need to add wrapper, can't find param for demo.details in jsFiddle docs.
$(function() {
  // Get data from a table.
  var rawData = [];
  var table;
  table = $('.iteration-report table');
  $.each(table.find('tbody').find('tr'), function (e) {
      var row = {};
      row.date = $(this).find('td.date').text();
      row.actual = $(this).find('td.actual').text() ? $(this).find('td.actual').text() : null;
      row.objectives = $(this).find('td.objectives').text() ? $(this).find('td.objectives').text() : null;
      row.objectivesWBuffer = $(this).find('td.objectives_w_buffer').text() ? $(this).find('td.objectives_w_buffer').text() : null;
      rawData.push({
          'd': row.date,
              'actual': row.actual,
              'objectives': row.objectives,
              'objectivesWBuffer': row.objectivesWBuffer
      });
  });

  // Basic line graph.
  Morris.Line({
      element: 'burn-down',
      data: rawData,
      xkey: 'd',
      xLabels: 'day',
      ykeys: ['actual', 'objectives', 'objectivesWBuffer'],
      labels: ['Open SP', 'Objectives', 'Objectives Incl. Buffer'],
      smooth: false,
      hideHover: false,
      lineColors: ['orange', 'lightblue', 'Gainsboro'],
      lineWidth: 2,
      pointSize: 3,
      pointFillColors: ['Red', 'White', 'Silver'],
      ymax:70,
      numLines: 8, //start+buffer+1 / 10 *rounded for base 10
  });
});
