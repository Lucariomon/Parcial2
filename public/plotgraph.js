(function (d3) {
    'use strict';
  
    const svg = d3.select('svg');
  
    const width = +svg.attr('width')-150;
    const height = +svg.attr('height');
  
    const render = data => {
      
      const name = d => d.name;

      const xValue = d => d.episodes;
      const xAxisLabel = 'episodes';
      
      const yValue = d => d.seasons;
      const circleRadius = 10;
      const yAxisLabel = 'seasons';
      
      const margin = { top: 60, right: 40, bottom: 88, left: 80 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue)).nice()
        .range([0, innerWidth]);
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue)).nice()
        .range([innerHeight, 0]);
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr("stroke-opacity", 0.1);
      
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove();
      
      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', -93)
          .attr('x', -innerHeight / 2)
          .attr('fill', 'black')
          .attr('transform', `rotate(-90)`)
          .attr('text-anchor', 'middle')
          .text(yAxisLabel);
      
      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 75)
          .attr('x', innerWidth / 2)
          .attr('fill', 'black')
          .text(xAxisLabel);
      
      g.selectAll('circle').data(data)
        .enter().append('text')
          .text(name)
          .attr('y', d => yScale(yValue(d)-0.1))
          .attr('x', d => xScale(xValue(d)+5));

      g.selectAll('circle').data(data)
        .enter().append('circle')
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)))
          .attr('r', circleRadius);

      
    };
  
    const data = JSON.parse(localStorage.getItem('info'));
      
    data.forEach(d => {
        d.seasons = +d.seasons;
        d.episodes = +d.episodes;
        d.name = d.name;
    });
    render(data);
  
  }(d3));