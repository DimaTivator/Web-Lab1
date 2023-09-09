document.addEventListener('DOMContentLoaded', function() {
    updateTable();
});


function checkAndSendData() {

    // getting X value
    let xInput = parseFloat(document.getElementById("X_input_text_field").value);

    // getting data from Y checkboxes
    let yCheckboxes = document.querySelectorAll("#y_checkbox input[type=checkbox]");
    let selectedY = [];
    yCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedY.push(checkbox.value);
        }
    });

    // getting data from the R selector
    let selectedR = document.getElementById("r-select").value;

    let isValid = true;

    // X validation
    if (isNaN(xInput) || xInput > 3 || xInput < -3) {
        isValid = false;
        alert("X must be from -3 to 3");
    }

    // Y validation
    if (selectedY.length === 0 || selectedY.length > 1) {
        isValid = false;
        alert("You should choose one Y value from the list");
    }

    if (isValid) {

        let input_data = new FormData();
        input_data.append('x', xInput.toString());
        input_data.append('y', selectedY[0]);
        input_data.append('r', selectedR);

        const url = `../php/script.php?X=${xInput}&Y=${selectedY[0]}&R=${selectedR}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error' + response.status);
                }
                return response.text();
            })
            .then(data => {
                let resultTable = localStorage.getItem("resultTable");

                if (resultTable == null) {
                    localStorage.setItem("resultTable", data);

                } else {
                    let rows = resultTable.split(",");
                    rows.push(data);
                    localStorage.setItem("resultTable", rows.join(","));
                }

                updateTable();

                console.log('Server response: ' + data);
            })
            .catch(error => {
                alert(error);
            });
    }
}

function updateTable() {
    clearTable();

    let resultTable = document.getElementById("result-table");
    let tableStorage = localStorage.getItem("resultTable");

    if (tableStorage){
        let rows = tableStorage.split(",");
        rows.forEach(row => resultTable.insertAdjacentHTML('beforeend', row));
    }
}

function clearTable() {
    let resultTable = document.getElementById('result-table')

    while (resultTable.rows.length > 1) {
        resultTable.deleteRow(1);
    }
}

function removeTable() {
    localStorage.removeItem("resultTable");
    clearTable();
}
