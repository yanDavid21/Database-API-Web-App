function test(query) {
    data = {
        queryString: document.getElementById("query-input").value
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
            let arr = object.response;
            let div = document.getElementById("output");
            while (div.hasChildNodes()) {   //clears previous result if any
                div.removeChild(div.firstChild);
            }

            if (arr.length === 0) { //if new response results in no tuples 
                let child = document.createElement("div");
                let text = document.createTextNode("Query successfully ran. No results.");
                child.appendChild(text);
                div.appendChild(child);
            } else {
                arr.forEach(element => {
                    let child = document.createElement("div");
                    let text = document.createTextNode(element.Name);
                    child.appendChild(text);
                    div.appendChild(child);
                });
            }
        } else {
            throw "Status error. Could not sucessfully query";
        }
    }).catch(err => {
        alert("An error occurred." + err);
    });
}


