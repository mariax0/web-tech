const apiUrl = "http://localhost:8000/api/";

async function get(url) {
  return (await axios.get(url)).data;
}

async function post(url, body) {
  return (
    await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}

// Functie pentru obtinerea unei resurse după ID
async function getById() {
  let id = document.getElementById("inputId").value;
  let resultDiv = document.getElementById("searchResult");

  if (!id) {
    alert("Introduceți un ID valid");
    return;
  }

  try {
    let data = await get(apiUrl + "getById/" + id);
    displaySearchResult(data, resultDiv);
  } catch (error) {
    console.error("Eroare la cautarea resursei:", error);
    resultDiv.innerHTML =
      '<p style="color: red;">Eroare: Resursa nu a fost gasita sau a aparut o eroare.</p>';
  }
}

// Functie pentru afiaarea rezultatului
function displaySearchResult(data, container) {
  if (!data || !container) {
    container.innerHTML = "<p>Date Inexistente.</p>";
    return;
  }

  let resultHtml = `
        <div style="border: 1px solid #ccc; padding: 15px; margin: 10px 0; background-color: #f9f9f9; border-radius: 5px;">
            <h4>Rezultat găsit:</h4>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Nume:</strong> ${data.name}</p>
            <p><strong>Vârsta:</strong> ${data.age}</p>
            <button onclick="clearSearchResult()" style="margin-top: 10px; padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;">
                Șterge rezultatul
            </button>
        </div>
    `;
  container.innerHTML = resultHtml;
}

// Functie pentru stergerea rezultatului
function clearSearchResult() {
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("inputId").value = "";
}

async function loadTable() {
  try {
    let data = await get(apiUrl + "getList");
    let tableDiv = document.getElementById("tableData");
    if (!data || !tableDiv) {
      return;
    }

    let myTable = document.getElementById("myTable");
    if (myTable) {
      myTable.remove();
    }

    let myHtmlCode = [];
    myHtmlCode.push(
      "<table id='myTable' style='border-collapse: collapse; width: 100%; margin-top: 20px;'>"
    );
    myHtmlCode.push('<thead style="background-color: #f2f2f2;">');
    myHtmlCode.push(
      '<tr> <th style="border: 1px solid #ddd; padding: 8px; text-align: left; hidden"> Id </th> <th style="border: 1px solid #ddd; padding: 8px; text-align: left;"> Name </th> <th style="border: 1px solid #ddd; padding: 8px; text-align: left;"> Age </th> </tr>'
    );
    myHtmlCode.push("</thead>");
    myHtmlCode.push("<tbody>");

    for (let item of data) {
      myHtmlCode.push(`
                <tr style="background-color: ${
                  data.indexOf(item) % 2 === 0 ? "#ffffff" : "#f9f9f9"
                };">
                    <td style="border: 1px solid #ddd; padding: 8px; display: none;">${
                      item.id
                    }</td> 
                    <td style="border: 1px solid #ddd; padding: 8px;">${
                      item.name
                    }</td> 
                    <td style="border: 1px solid #ddd; padding: 8px;">${
                      item.age
                    }</td> 
                </tr>
            `);
    }

    myHtmlCode.push("</tbody>");
    myHtmlCode.push("</table>");
    tableDiv.innerHTML = myHtmlCode.join("");
  } catch (error) {
    console.error("Eroare la incarcarea tabelului:", error);
    document.getElementById("tableData").innerHTML =
      '<p style="color: red;">Eroare la incarcarea datelor.</p>';
  }
}

async function sendData() {
  let name = document.getElementById("inputName").value.trim();
  let age = document.getElementById("inputAge").value;

  if (!name || !age) {
    alert("Trebuie sa introduceti un nume si o varsta");
    return;
  }

  if (isNaN(age) || age < 0) {
    alert("Varsta trebuie să fie un numar valid");
    return;
  }

  try {
    await post(apiUrl + "postList", { name: name, age: parseInt(age) });
    document.getElementById("inputName").value = "";
    document.getElementById("inputAge").value = "";
    await loadTable();
    alert("Datele au fost adăugate cu succes!");
  } catch (error) {
    console.error("Eroare la salvarea datelor:", error);
    alert("Eroare la salvarea datelor. Incercati din nou.");
  }
}

loadTable();
