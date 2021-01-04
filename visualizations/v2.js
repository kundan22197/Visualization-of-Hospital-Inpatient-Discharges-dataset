




function legend2(div, color2) {
  const size = 10;
  const lineHeight = size * 1.5;

  const svg = div.append("svg");
  
  const rows = svg
    .selectAll("g")
    .data(color2.domain())
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);

  rows
    .append("rect")
    .attr("height", size)
    .attr("width", size)
    .attr("fill", d => color2(d));

  rows
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("dominant-baseline", "hanging")
    .attr("x", lineHeight)
    .text(d => d);
}




function v2(data, div) {

  const data2 = data.map(d => ({code: d.ccs_diagnosis_code, description: d.ccs_diagnosis_description, gender: d.gender, ethnicity: d.ethnicity}));

	const grouped_data = d3.rollup(data2, arr => arr.length, d => d.ethnicity, d => d.gender);

	const array_data = Array.from(grouped_data, ([ethnicity, count_by_gender]) => ({
    ethnicity: ethnicity,
    count_by_gender: Array.from(count_by_gender, ([gender, count]) => ({gender, count}))
  }));
  		


	const ethnicities = array_data.map(d => d.ethnicity);

	const genders = Array.from(d3.group(data2, d => d.gender), ([key, value]) => ({key, value})).map(d => d.key);

	const max_diagnosis_count = d3.max(array_data, d => d3.max(d.count_by_gender, e => e.count));


    const color2 = d3.scaleOrdinal()
    .domain(genders)
    .range(d3.schemeTableau10);

    legend2(div, color2);

    const margin = {top: 10, right: 0, bottom: 20, left: 130};

  	const visWidth = 2000 - margin.left - margin.right;
  	const visHeight = 500 - margin.top - margin.bottom;


  	const svg = div.append('svg')
     .attr("viewBox", [-270, -50, visWidth+500, visHeight+200]);

     svg.append('text')
      .attr('x', visWidth / 2)
      .attr('y', -margin.top)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 30)
      .attr('text-anchor', 'middle')
      // .attr('dominant-baseline', 'hanging')
      .text('Relative Amount of diagnosis by gender and ethnicity');
  
  const x = d3.scalePoint()
      .domain(ethnicities)
      .range([0, visWidth]);

  // the radius of the pie charts
  const outerRadius = x.step() / 5;
  // const outerRadius = 600;
  
  // this axis will show the month labels
  const xAxis = d3.axisBottom(x);


  svg.append('g')
    .attr('transform', `translate(0,${(visHeight / 2) + outerRadius + 5})`)
        // .attr('transform', `translate(0,${(visHeight / 2)})`)

    .call(xAxis)
    .attr('font-size', 20)
    .call(g => g.selectAll('.domain').remove());
  
  // create the pie and area generators

  const pie = d3.pie()
      .value(d => d.count);

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(outerRadius);

  const pieGroups = svg.selectAll('.pieGroup')
    .data(array_data)
    .join('g')
      .attr('class', 'pieGroup')
      .attr('transform', d => `translate(${x(d.ethnicity)},${visHeight / 2})`)
      

  pieGroups.selectAll('path')
    .data(d => pie(d.count_by_gender))
    .join('path')
      .attr('d', d => arc(d))
      .attr('fill', d => color2(d.data.gender));


}



























  //    const group = d3.scaleBand()
  //     .domain(age_groups)
  //     .range([0, visWidth])
  //     .padding(0.2);



  //     const y = d3.scaleLinear()
  //     .domain([0, max_mortality_risk]).nice()
  //     .range([visHeight, 0]);
  
  // // this scale will be used to position the bars within a group
  // 	const x = d3.scaleBand()
  //     .domain(mortality_risks)
  //     .range([0, group.bandwidth()])
  //     .padding(0.2);



  //    const xAxis = d3.axisBottom(group);
  
  // const yAxis = d3.axisLeft(y);
  
  // svg.append('g')
  //     .attr('transform', `translate(0,${visHeight})`)
  //     .call(xAxis)
  //     .call(g => g.selectAll('.domain').remove());
  
  // svg.append("g")
  //     .call(yAxis)
  //     .call(g => g.selectAll('.domain').remove())
  //   .append('text')
  //     // .attr('text-anchor', 'start')
  //     // .attr('dominant-baseline', 'middle')
  //     .attr('fill', 'black')
  //     .attr('x', -150)
  //     .attr('y', visHeight / 2 - 230)
  //     .attr("transform", function(d) {
  //               return "rotate(-90)" 
  //               })
  //     .text('Mortality risk counts');
  
  // // create and position one group for each month
  // const groups = svg.selectAll('.group')
  //   .data(array_age_data)
  //   .join('g')
  //     .attr('class', 'group')
  //     .attr('transform', d => `translate(${group(d.age_groups)},0)`);
  
  // // add the bars to each group
  // groups.selectAll('rect')
  //   .data(d => d.count_by_risk)
  //   .join('rect')
  //     .attr('fill', d => color2(d.risk))
  //     .attr('y', d => y(d.count))
  //     .attr('height', d => visHeight - y(d.count))
  //     .attr('x', d => x(d.risk))
  //     .attr('width', x.bandwidth());


// }


























