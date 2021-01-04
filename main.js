



function getData(){
    let url = `https://health.data.ny.gov/resource/gnzp-ekau.json?$where=UPPER(ccs_diagnosis_description) like '%25CANCER%25'&$limit=1000`;
    let token = 'DON4VZy6K3SYPjWd5v1K8Do8G';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Token': `${token}`
        },
      }).then(function(result) {
        return result.json();
    }).then(function(json) {

		v1(json, d3.select('#vis1'));
		v2(json, d3.select('#vis2'));
  		v3(json, d3.select('#vis3'));





    });
  }



