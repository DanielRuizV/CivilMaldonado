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

    // Function to parse CSV data into an array of objects
    function parseCSV(data) {
        const rows = data.split('\n').filter(row => row.trim() !== ''); // Filtrar filas vacías
        const headers = rows[0].split(',').map(header => header.trim()); // Asegúrate de trim los encabezados

        return rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((object, header, index) => {
                object[header] = values[index] ? values[index].trim() : ''; // Verificación de valores indefinidos
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
                <td>${caso['NUMERO'] || (index + 1)}</td>
                <td>${caso['ABOGADO'] || 'No definido'}</td>
                <td>${caso['CASO'] || 'No definido'}</td>
                <td>${caso['DEMANDA PRESENTADA'] || 'No definido'}</td>
                <td>${caso['MEDIACION'] || 'No definido'}</td>
                <td>${caso['55 LESIONADO/51 FINADO'] || 'No definido'}</td>
                <td>${caso['FECHA DE PRESENTACIÓN'] || 'No definido'}</td>
                <td>${caso['ADMISION']}</td>
                <td>${caso['FECHA DE ADMISION']}</td>
                <td>${caso['ASEGURADORA']}</td>
                <td>${caso['ASEGURADORA EMPLAZADA']}</td>
                <td>${caso['FECHA DE EMPLAZAMIENTO ASEGURADORA']}</td>
                <td>${caso['VISTA ASEGURADORA']}</td>
                <td>${caso['FECHA DESAHOGO DE VISTA ASEGURADORA']}</td>
                <td>${caso['DIRECCION ASEGURADORA']}</td>
                <td>${caso['VENCIMIENTO CONTESTACION ASEGURADORA']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO CONTESTACIÓN VISTA ASEGURADORA']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['PROPIETARIO A EMPLAZAR']}</td>
                <td>${caso['PROPIETARIO EMPLAZADO']}</td>
                <td>${caso['FECHA DE EMPLAZAMIENTO PROPIETARIO']}</td>
                <td>${caso['VISTA PROPIETARIO']}</td>
                <td>${caso['FECHA DE DESAHOGO DE VISTA PROPIETARIO']}</td>
                <td>${caso['DIRECCION PROPIETARIO']}</td>
                <td>${caso['CONTACTO DE PROPIETARIO']}</td>
                <td>${caso['VENCIMIENTO CONTESTACION ASEGURADORA']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO CONTESTACION DESAHOGO DE VISTA ASEGURADORA']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['CONDUCTOR']}</td>
                <td>${caso['CONDUCTOR EMPLAZADO']}</td>
                <td>${caso['FECHA EMPLAZAMIENTO CONDUCTOR']}</td>
                <td>${caso['VISTA CONDUCTOR']}</td>
                <td>${caso['FECHA DE DESAHOGO VISTA CONDUCTOR']}</td>
                <td>${caso['DIRECCION DE RESPONSABLE']}</td>
                <td>${caso['CONTACTO DE RESPONSABLE']}</td>
                <td>${caso['VENCIMIENTO CONTESTACION']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['VENCIMIENTO DESAHOGO DE VISTA']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['COMENTARIO']}</td>
                <td>${caso['FECHA ULTIMA ACTUACION']}</td>
                <td>${caso['FECHA DE VENCIMIENTO']}</td>
                <td>${caso['DIAS RESTANTES']}</td>
                <td>${caso['DEMANDA PRESENTADA']}</td>
                <td>${caso['EXHORTO']}</td>
                <td>${caso['REPRESENTADOS DEMANDA']}</td>
                <td>${caso['VIRTUAL/PRESENCIAL']}</td>
                <td>${caso['LUGAR']}</td>
                <td>${caso['FECHA DE AUDIENCIA']}</td>
                <td>${caso['JUZGADO']}</td>
                <td>${caso['EXPEDIENTE']}</td>
                <td>${caso['TIPO DE AUDIENCIA']}</td>
                <td>${caso['ABOGADO QUE DESAHOGARA']}</td>
                <td>${caso['LINK DE AUDIENCIA']}</td>
                <td>${caso['PSICOLOGIA']}</td>
                <td>${caso['TRABAJO SOCIAL']}</td>
                <td>${caso['MEDICINA']}</td>
                <td>${caso['HECHOS VIALES']}</td>
                <td>${caso['SINIESTRALIDAD']}</td>
                <td>${caso['LINK DE CARPETA']}</td>
                <td>${caso['NOTA']}</td>
                <td>${caso['PUBLICAR']}</td>
                <td>${caso['POLIZA']}</td>
                <td>${caso['MONTO']}</td>
                <td>${caso['FECHA DE LOS HECHOS']}</td>
                <td>${caso['LUGAR DEL SINIESTRO']}</td>
                <td>${caso['NOTA']}</td>
                <td>${caso['CONCLUYO']}</td>
                <td>${caso['POLIZA']}</td>
                <td>${caso['VIGENCIA DE LA PÓLIZA']}</td>
                <td>${caso['AGENTE']}</td>
                <td>${caso['DOMICILIO']}</td>
                <td>${caso['TELEFONO']}</td>
                <td>${caso['CORREO ELECTRÓNICO DEL AGENTE']}</td>
                <td>${caso['EXP CIVIL']}</td>
                <td>${caso['CARPETA INVESTIGACION']}</td>
                <td>${caso['CARPETA JUDICIAL']}</td>
                <td>${caso['PRETENSION']}</td>
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



               
