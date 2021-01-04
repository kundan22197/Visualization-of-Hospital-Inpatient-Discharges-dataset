# Visualization-of-Hospital-Inpatient-Discharges-dataset
Visualization of Hospital Inpatient Discharges dataset using Javascript library d3.js





## Contents

* `index.html` contains the basic HTML structure and links to the CSS and JS files.

* `style.css` contains CSS rules.

* `d3` contains the D3 library.


* `main.js` calls the API and sends the json data to the visualization functions.

* `visualizations` contains the code to make the visualizations. 


On loading the html body, we call the getData function in main.js which uses the Fetch API call and makes a GET request to [https://health.data.ny.gov/resource/gnzp-ekau.json?$where=ccs_diagnosis_description like '%25CANCER%25'&$limit=1000]. The obtained data is used to create the visualizations.
