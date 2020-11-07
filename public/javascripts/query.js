
function removeChildById(id) {
    let div = document.getElementById(id);
    while (div.hasChildNodes()) {   //clears previous result if any
         div.removeChild(div.firstChild);
    }
}

function test() {
    let query = document.getElementById("query-input").value;
    //scrub query
    if (query.indexOf(";") != -1) {
        query = query.substring(0, query.indexOf(";"))
    }
    data = {
        queryString: query
    }
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(object => {
        if (object.status === "success") {
            removeChildById("output-head"); //clear the previous results
            removeChildById("output-body");

            let arr = object.response;

            if (arr.length === 0) { //if new response results in no tuples 
                let child = document.createElement("div");
                let text = document.createTextNode("Query successfully ran. No results.");
                child.appendChild(text);
                div.appendChild(child);
            } else { //otherwise 
                const tableHeaders = new Set(); //element storing table headers
                let head = document.getElementById("output-head");
                let body = document.getElementById("output-body");
                
                arr.forEach(element => { //get all keys from objects to be made headers
                    for (const key in element) {
                        if (!tableHeaders.has(key)) { 
                            tableHeaders.add(key);
                        }
                    }
                });

                console.log(tableHeaders);

                tableHeaders.forEach(header => { //for every header in the arr, create a table header
                    let child = document.createElement("th");
                    let text = document.createTextNode(header);
                    child.appendChild(text);
                    head.appendChild(child);
                })

                arr.forEach(element => { //for every object (tuple) create a row, then cells for each key value
                    let row = document.createElement("tr")
                   tableHeaders.forEach(key => {
                       let cell = document.createElement("td");
                       let text = document.createTextNode(element[key]);
                       cell.appendChild(text);
                       row.appendChild(cell);
                   })
                   body.appendChild(row);
                });
            }
        } else {
            throw "Status error. Could not sucessfully query";
        }
    }).catch(err => {
        alert("An error occurred." + err);
    });
}


