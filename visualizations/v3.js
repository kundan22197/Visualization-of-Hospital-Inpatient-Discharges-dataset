



function v3(data, div) {



const data3 = data.map(d => ({mdc_code: d.apr_mdc_code, mdc_description: d.apr_mdc_description, illness_severity_code: d.apr_severity_of_illness_code, illness_severity_description: d.apr_severity_of_illness_description}));


const illness_data3 = d3.rollup(data3, arr => arr.length, d => d.mdc_code, d => d.illness_severity_code);

  const array_illness_data =  Array.from(illness_data3, ([mdc_code, count_by_illness_code]) => ({
    mdc_code: mdc_code,
    count_by_illness_code: Array.from(count_by_illness_code, ([illness_code, count]) => ({illness_code, count}))
  }));




  const by_mdc_code = Array.from(d3.rollup(data3, v => v.length, d => d.mdc_code),
                               ([mdc_code, count]) => ({mdc_code, count}));
  
  const mdc_codes_sorted =  by_mdc_code.sort((a, b) => d3.descending(a.count, b.count))
      .map(d => d.mdc_code);





  const by_illness_code = Array.from(d3.rollup(data3, v => v.length, d => d.illness_severity_code),
                               ([illness_severity_code, count]) => ({illness_severity_code, count}));
  
  const illness_codes_sorted =  by_illness_code.sort((a, b) => d3.descending(a.count, b.count))
      .map(d => d.illness_severity_code);






    const maxCount = d3.max(illness_data3,
                  ([mdc_code, count_by_illness_code]) => d3.max(count_by_illness_code,
                                                       ([illness_code, count]) => count));



    const margin = {top: 200, right: 70, bottom: 50, left: 10};
  const visWidth = 3000 - margin.left - margin.right;
  const visHeight = 1200 - margin.top - margin.bottom;


    const svg = div.append('svg')
     .attr("viewBox", [-70, -50, visWidth, visHeight+500]);


       const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);



      g.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "35px")
    .text("Number of cases based on MDC codes and severity levels");
  
  // create scales

  const x = d3.scalePoint()
      .domain(mdc_codes_sorted)
      .range([0, visWidth])
      .padding(0.2);
  
  const y = d3.scalePoint()
      .domain(illness_codes_sorted)
      .range([0, visHeight])
      .padding(0.2);
  
  const maxRadius = 30;
  const radius = d3.scaleSqrt()
      .domain([0, maxCount])
      .range([0, maxRadius]);
  
  // add legend
  
  const legend = g.append("g")
      .attr("transform", `translate(${visWidth + margin.right - 250}, -150)`)
    .selectAll("g")
    .data([50, 100, 150, 200])
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 2.5 * maxRadius})`);
  
  legend.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", "purple");

  legend.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("dominant-baseline", "middle")
    .attr("x", maxRadius + 5)
    .text(d => d);
  
  // create and add axes
  
  const xAxis = d3.axisBottom(x);
  
  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .attr('font-size', 30)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth / 2)
      .attr("y", 100)
      .attr("fill", "black")
      .attr('font-size', 30)
      .attr("text-anchor", "middle")
      .text("MDC Codes");
  
  const yAxis = d3.axisLeft(y);
  
  g.append("g")
      .call(yAxis)
      .attr('font-size', 30)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", -360)
      .attr("y", visHeight / 2 - 530)
      .attr("fill", "black")
      .attr('font-size', 30)
      .attr("dominant-baseline", "middle")
      .attr("transform", function(d) {
                return "rotate(-90)" 
                })
      .text("Illness Severity Codes");
      
  
  // draw points
  
  const cols = g.selectAll(".col")
    .data(array_illness_data)
    .join("g")
      .attr("transform", d => `translate(${x(d.mdc_code)}, 0)`);
  
  cols.selectAll("circle")
    .data(d => d.count_by_illness_code)
    .join("circle")
      .attr("cy", d => y(d.illness_code))
      .attr("cx", d => 0)
      .attr("fill", "purple")
      .attr("r", d => radius(d.count));




}









