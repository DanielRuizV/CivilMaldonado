document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRC2l4UWvj0cWN3y0tFIR0gL4ioQtAriLC8EKoUuKu6KTFPj0SXX0lwUmY3AAgRdJ-6iSrUYgqJS79M/pub?output=csv';
    
    // Fetch the CSV data from the Google Sheets URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const parsedData = parseCSV(data);
            loadTableData(parsedData);
        })
        .catch(error => console.error('Error fetching data:', error));

    const tableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('search');
    const tableHeaders = document.querySelectorAll('th');

    // Function to parse CSV data into an array of objects
    function parseCSV(data) {
        const rows = data.split('\n').filter(row => row.trim() !== ''); // Filtrar filas vacías
        const headers = rows[0].split(',');

        return rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((object, header, index) => {
                object[header.trim()] = values[index] ? values[index].trim() : ''; // Verificación de valores indefinidos
                return object;
            }, {});
        });
    }

    // Function to load the data into the table
    function loadTableData(casos) {
        tableBody.innerHTML = ''; // Clear the table before reloading

        casos.forEach((caso, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${caso['NÚMERO']}</td>
                <td>${caso['ABOGADO']}</td>
                <td>${caso['CASO']}</td>
                <td>${caso['DEMANDA PRESENTADA']}</td>
                <td>${caso['MEDIACIÓN']}</td>
                <td>${caso['55 LESIONADO/51 FINADO']}</td>
                <td>${caso['FECHA DE PRESENTACIÓN']}</td>
                <td>${caso['ADMISIÓN']}</td>
                <td>${caso['FECHA DE ADMISIÓN']}</td>
                <td>${caso['ASEGURADORA']}</td>
                <td>${caso['ASEGURADORA EMPLAZADA']}</td>
                <td>${caso['FECHA DE EMPLAZAMIENTO ASEGURADORA']}</td>
                <td>${caso['VISTA ASEGURADORA']}</td>
                <td>${caso['FECHA DESAHOGO DE VISTA ASEGURADORA']}</td>
                <td>${caso['DIRECCIÓN ASEGURADORA']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN ASEGURADORA']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN VISTA ASEGURADORA']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['PROPIETARIO A EMPLAZAR']}</td>
                <td>${caso['PROPIETARIO EMPLAZADO']}</td>
                <td>${caso['FECHA DE EMPLAZAMIENTO PROPIETARIO']}</td>
                <td>${caso['VISTA PROPIETARIO']}</td>
                <td>${caso['FECHA DE DESAHOGO DE VISTA PROPIETARIO']}</td>
                <td>${caso['DIRECCIÓN PROPIETARIO']}</td>
                <td>${caso['CONTACTO DE PROPIETARIO']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN ASEGURADORA']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN DESAHOGO DE VISTA ASEGURADORA']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['CONDUCTOR']}</td>
                <td>${caso['CONDUCTOR EMPLAZADO']}</td>
                <td>${caso['FECHA EMPLAZAMIENTO CONDUCTOR']}</td>
                <td>${caso['VISTA CONDUCTOR']}</td>
                <td>${caso['FECHA DE DESAHOGO VISTA CONDUCTOR']}</td>
                <td>${caso['DIRECCIÓN DE RESPONSABLE']}</td>
                <td>${caso['CONTACTO DE RESPONSABLE']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO DESAHOGO DE VISTA']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['COMENTARIO']}</td>
                <td>${caso['FECHA ÚLTIMA ACTUACIÓN']}</td>
                <td>${caso['FECHA DE VENCIMIENTO']}</td>
                <td>${caso['DÍAS RESTANTES']}</td>
                <td>${caso['DEMANDA PRESENTADA']}</td>
                <td>${caso['EXHORTO']}</td>
                <td>${caso['REPRESENTADOS DEMANDA']}</td>
                <td>${caso['VIRTUAL/PRESENCIAL']}</td>
                <td>${caso['LUGAR']}</td>
                <td>${caso['FECHA DE AUDIENCIA']}</td>
                <td>${caso['JUZGADO']}</td>
                <td>${caso['EXPEDIENTE']}</td>
                <td>${caso['TIPO DE AUDIENCIA']}</td>
                <td>${caso['ABOGADO QUE DESAHOGARÁ']}</td>
                <td>${caso['LINK DE AUDIENCIA']}</td>
                <td>${caso['PSICOLOGÍA']}</td>
                <td>${caso['TRABAJO SOCIAL']}</td>
                <td>${caso['MEDICINA']}</td>
                <td>${caso['HECHOS VIALES']}</td>
                <td>${caso['SINIESTRALIDAD']}</td>
                <td>${caso['LINK DE CARPETA']}</td>
                <td>${caso['NOTA']}</td>
                <td>${caso['PUBLICAR']}</td>
                <td>${caso['PÓLIZA']}</td>
                <td>${caso['MONTO']}</td>
                <td>${caso['FECHA DE LOS HECHOS']}</td>
                <td>${caso['LUGAR DEL SINIESTRO']}</td>
                <td>${caso['NOTA']}</td>
                <td>${caso['CONCLUYO']}</td>
                <td>${caso['PÓLIZA']}</td>
                <td>${caso['VIGENCIA DE LA PÓLIZA']}</td>
                <td>${caso['AGENTE']}</td>
                <td>${caso['DOMICILIO']}</td>
                <td>${caso['TELÉFONO']}</td>
                <td>${caso['CORREO ELECTRÓNICO DEL AGENTE']}</td>
                <td>${caso['EXP CIVIL']}</td>
                <td>${caso['CARPETA INVESTIGACIÓN']}</td>
                <td>${caso['CARPETA JUDICIAL']}</td>
                <td>${caso['PRETENSIÓN']}</td>
                <td>${caso['REPORTE']}</td>
                <td>${caso['ACTIVO']}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to filter the data
    function filterData(event) {
        const searchTerm = event.target.value.toLowerCase();
        const rows = Array.from(tableBody.rows);

        rows.forEach(row => {
            const values = Array.from(row.cells).map(cell => cell.textContent.toLowerCase());
            const isVisible = values.some(value => value.includes(searchTerm));
            row.style.display = isVisible ? '' : 'none';
        });
    }

    // Add event for search input
    searchInput.addEventListener('input', filterData);
});