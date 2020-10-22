import * as d3 from 'd3';
import DOM from "./dom/index";
{
    const pointHeight = 0;
    const height = 350;
    const margin = {
        top: 10,
        bottom: 20,
        left: 30,
        right: 210
    }
    const width = 810;
    const chartHeight = 350;
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const colors = ["#50BEAF", "#B1C425", "#6987B9", "#FF9933"];
    const yScale = d3.scaleLinear()
    .domain([0, 12])
    .range([chartHeight, 0]);
    const xScale = d3.scalePoint()
    .domain(years)
    .range([0, width]);
    
    const data = [{"year":"1","mb":"0.02","gcb":"1.53"},{"year":"2","mb":"0.04","gcb":"3.04"},{"year":"3","mb":"0.05","gcb":"4.42"},{"year":"4","mb":"0.07","gcb":"5.62"},{"year":"5","mb":"0.09","gcb":"6.64"},{"year":"6","mb":"0.1","gcb":"7.51"},{"year":"7","mb":"0.12","gcb":"8.26"},{"year":"8","mb":"0.14","gcb":"8.92"},{"year":"9","mb":"0.15","gcb":"9.55"},{"year":"10","mb":"0.16","gcb":"10.13"}];
    const div = d3.select('#test')
      .style("font-family", "Klavika")
      .style("height", `${height + pointHeight}px`)
    
  //   const header = div.append("h1")
  //     .style("font-size", "20px")
  //     .style("font-family", "Klavika")
  //     .style("font-weight", 900)
  //     .text("Why Do Muni Bonds Default So Rarely?");
    
  //   const description = div.append("p")
  //     .style("position", "absolute")
  //     .style("font", "14px sans-serif")
  //     .style("font-family", "Klavika")
  //     .style("font-weight", 100)
  //     .style("margin-top", "0px")
  //     .text("When investors look for yield, they often overlook munis. But they shouldn’t. In addition to offering relatively high yields and unique tax advantages, they have been remarkably reliable over the last five decades. See just how reliable, and some of the reasons why.");
    
    const explanation = div.append("p")
      .style("position", "absolute")
      .style("font", "12px sans-serif")
      .style("font-style", "italic")
      .style("font-family", "Klavika")
      // .style("font-weight", 100)
      .style("margin-top", "0px")
      .text("Average Cumulative Default Rates for Periods of 1 to 10 Years (1970 - 2018)");
    
    const svg = div.append("svg")
      .style("position", "absolute")
      .style("top", "30px")
      .style("font-family", "Klavika")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const clip = DOM.uid("clip")
    const clipPath = g.append("clipPath")
      .attr("id", clip.id)
     
    const clipPathRect = clipPath.append("rect")
      .attr("x", 0)
      .attr("width", 5)
      .attr("y", 0)
      .attr("height", chartHeight);   
    
    const yAxis = g.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale).tickSize(-width).tickValues([0, 1, 3, 6, 9, 12]).tickFormat(d => `${d}%`));
    
    yAxis.selectAll("line")
      .style("stroke-dasharray", "1")
      .style("stroke", "lightgray")
    
    yAxis.selectAll("path").remove()
    
    yAxis.selectAll("text")
      .style("font-family", "Klavika")
      .style("font-size", "12px");
    
    const xAxis = g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale));
    
    xAxis.selectAll("text")
      .style("font-size", "12px")
      .style("font-family", "Klavika")
    
    xAxis.selectAll("line")
      .style("stroke", "darkgray")
    
    xAxis.selectAll("path")
      .style("stroke", "darkgray")
    
    const line = d3.line()
      .curve(d3.curveNatural)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
    
    const area = d3.area()
      .curve(d3.curveNatural)
      .x(d => xScale(d[0]))
      .y0(d => yScale(d[1]))
      .y1(d => yScale(d[2]))
    
    const areadiff = g.append("path")
      .datum(data.map(d => [d.year, d.gcb, d.mb]))
      .style("fill", "lightgray")
      .style("fill-opacity", .25)
      .attr("clip-path", clip)
      .attr("d", area)
    
    const gcbLine = g.append("path")
      .datum(data.map(d => [d.year, d.gcb]))
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", colors[0])
      .style("stroke-width", 4)
      .attr("clip-path", clip)
      .attr("stroke-linecap", "round")
    
    const firstRecord = data[0];
    
    const gcbText = g.append("text")
      .datum([firstRecord.year, firstRecord.gcb])
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .style("font", "14px sans-serif")
      .style("font-weight", 900)
      .style("font-family", "Klavika")
      .attr("dx", 5)
      .attr("dy", 4)
      .text(d => `Global Corporate Bonds: ${d[1]}% `)
      .style("fill", colors[0])
    
    const mbLine = g.append("path")
      .datum(data.map(d => [d.year, d.mb]))
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", colors[2])
      .style("stroke-width", 4)
      .attr("clip-path", clip)
      .attr("stroke-linecap", "round")
    
    const mbText = g.append("text")
      .datum([firstRecord.year, firstRecord.mb])
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .style("font", "14px sans-serif")
      .style("font-family", "Klavika")
      .style("font-weight", 900)
      .attr("dx", 5)
      .attr("dy", 0)
      .text(d => `Municipal Bonds: ${d[1]}% `)
      .style("fill", colors[2])
    
    let k = 1;
    const animateTimer = d3.interval(function draw() {
      
      const thisRecord = data[k]
      gcbText.datum([thisRecord.year, thisRecord.gcb])
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .text(d => `Global Corporate Bonds: ${d[1]}% `)
  
      mbText.datum([thisRecord.year, thisRecord.mb])
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .text(d => `Municipal Bonds: ${d[1]}% `)
      
      clipPathRect
        .transition()
        .duration(1000)
        .attr("width", xScale(thisRecord.year) + 5);
      
      k++
      if(k == data.length) {
        animateTimer.stop()
      }
      
     }, 1000)
  
  //   const pTexts = div.selectAll(".point")
  //     .data(points)
  //     .join("p")
  //     .style("position", "absolute")
  //     .attr("class", "point")
  //     .style("left", (d,i) => `${pScale(d) + 10}px`)
  //     .style("top", `${chartHeight + margin.top + margin.bottom + 140}px`)
  //     .style("width", `${pScale.bandwidth()}px`)
  //     .style("max-width", `${pScale.bandwidth() * .85}px`)
  //     .style("height", `${pointHeight}px`)
  //     .style("font", "14px sans-serif")
  //     .style("font-family", "Klavika")
  //     .html((d,i) => `${d}`)
  //     .style("opacity", 0)
    
    

    
  //   let j = -4;
  //   while(true) {
      
  //     yield div.node();
  //     await Promises.delay(2000);
      
  //     pTexts.filter((d,i) => i <= j)
  //       .transition()
  //       .duration(1000)
  //       .style('opacity', 1)
  
  //     j++;
  //     if(j > points.length) {
  //       j = 0;
  //     }
      
  //   }
  }
