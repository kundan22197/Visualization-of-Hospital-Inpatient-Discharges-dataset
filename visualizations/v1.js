






function legend1(div, color1) {
  const size = 10;
  const lineHeight = size * 1.5;

  const svg = div.append("svg");
  
  const rows = svg
    .selectAll("g")
    .data(color1.domain())
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);

  rows
    .append("rect")
    .attr("height", size)
    .attr("width", size)
    .attr("fill", d => color1(d));

  rows
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("dominant-baseline", "hanging")
    .attr("x", lineHeight)
    .text(d => d);
}




function v1(data, div) {


console.log(data);
const data1 = data.map(d => ({age: d.age_group, mortality_risk: d.apr_risk_of_mortality}));

	// data1 = d3.csvParse(data, d => (d3.autoType(d), { code: d.ccs_diagnosis_code, description: d.ccs_diagnosis_description, gender: d.gender, ethnicity: d.ethnicity}));

	const age_data = d3.rollup(data1, arr => arr.length, d => d.age, d => d.mortality_risk);

	const array_age_data = Array.from(age_data, ([age_groups, count_by_risk]) => ({
    	age_groups: age_groups,
    	count_by_risk: Array.from(count_by_risk, ([risk, count]) => ({risk, count}))
  		}));
  		


	const age_groups = array_age_data.map(d => d.age_groups);

	const mortality_risks = Array.from(d3.group(data1, d => d.mortality_risk), ([key, value]) => ({key, value})).map(d => d.key);

	const max_mortality_risk = d3.max(array_age_data, d => d3.max(d.count_by_risk, e => e.count));

	const color1 = d3.scaleOrdinal()
    .domain(mortality_risks)
    .range(d3.schemeTableau10);

    legend1(div, color1);


    const margin = {top: 10, right: 0, bottom: 20, left: 130};

  	const visWidth = 1500 - margin.left - margin.right;
  	const visHeight = 400 - margin.top - margin.bottom;


  	const svg = div.append('svg')
     .attr("viewBox", [-70, -50, visWidth, visHeight+200]);





      svg.append("text")
    .attr("x", visWidth / 2)
    .attr("y", -margin.top-30)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .text("Number of cases based on age groups and mortality risk levels");

     const group = d3.scaleBand()
      .domain(age_groups)
      .range([0, visWidth])
      .padding(0.2);



      const y = d3.scaleLinear()
      .domain([0, max_mortality_risk]).nice()
      .range([visHeight, 0]);
  
  // this scale will be used to position the bars within a group
  	const x = d3.scaleBand()
      .domain(mortality_risks)
      .range([0, group.bandwidth()])
      .padding(0.2);



     const xAxis = d3.axisBottom(group);
  
  const yAxis = d3.axisLeft(y);
  
  
  svg.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis)
      .attr('font-size', 20)
      .call(g => g.selectAll('.domain').remove())
      .append('text')
      // .attr('text-anchor', 'start')
      // .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', visWidth / 2)
      .attr('y', visHeight / 2 - 120)
      // .attr("transform", function(d) {
      //           return "rotate(-90)" 
      //           })
      .text('Age groups');
  
  svg.append("g")
      .call(yAxis)
      .attr('font-size', 20)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      // .attr('text-anchor', 'start')
      // .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', -120)
      .attr('y', visHeight / 2 - 230)
      .attr("transform", function(d) {
                return "rotate(-90)" 
                })
      .text('Number of diagnosis');
  
  // create and position one group for each month
  const groups = svg.selectAll('.group')
    .data(array_age_data)
    .join('g')
      .attr('class', 'group')
      .attr('transform', d => `translate(${group(d.age_groups)},0)`);
  
  // add the bars to each group
  groups.selectAll('rect')
    .data(d => d.count_by_risk)
    .join('rect')
      .attr('fill', d => color1(d.risk))
      .attr('y', d => y(d.count))
      .attr('height', d => visHeight - y(d.count))
      .attr('x', d => x(d.risk))
      .attr('width', x.bandwidth());


}


























