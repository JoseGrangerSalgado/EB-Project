var page = 1;
async function getProperties() {
  const responseFromServer = await fetch(`/public/Properties/${page}`);
  document.getElementById("page_number").innerHTML = `Page: ${page}`
  const properties = await responseFromServer.json();
  if (properties['pagination']['next_page'] != null){
    page += 1
  }
  else{
    page = 1
  }
  createTable(properties['content']);
}

async function getProperty(id) {
  const responseFromServer = await fetch(`/public/Property/${id}`);
  const property = await responseFromServer.json();
  console.log(property);
  createProperty(property);
  
} 

function createProperty(data){
  window.location.href = "#image"
  let id = document.getElementById("id");
  id.innerHTML = data['public_id'];
  let title = document.getElementById("title");
  title.innerHTML = data['title'];
  let description = document.getElementById("description");
  description.innerHTML = data['description'];
  let image = document.getElementById("image");
  if (data['property_images'].length == 0){
    image.alt = " Image not Found";
  }
  else{
    image.src = data['property_images'][0]['url'];
  }
  let type = document.getElementById("type");
  type.innerHTML = data['property_type'];
  let location = document.getElementById("location");
  location.innerHTML = data['location']['name'];

  var f = document.getElementById("contact-form");
  f.style.display = "block";
  f.setAttribute('action',`/public/Contact/${data['public_id']}`);
}

function createTable(data) {
  let table = document.getElementById('Properties');
  table.innerHTML = "";
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);


  // Creating and adding data to first row of the table
  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = "Public ID";
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = "Title";
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = "Property Type";
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = "Property Location";
  let heading_5 = document.createElement('th');
  heading_5.innerHTML = "Image";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  thead.appendChild(row_1);

  for (let i = 0; i<Object.keys(data).length;  i++){
    let row = document.createElement('tr');
    let row_data_1 = document.createElement('td');
    row_data_1.innerHTML = data[i]['public_id'];
    row_data_1.onclick = () => getProperty(data[i]['public_id']);
    let row_data_2 = document.createElement('td');
    row_data_2.innerHTML = data[i]['title'];
    let row_data_3 = document.createElement('td');
    row_data_3.innerHTML = data[i]['property_type'];
    let row_data_4 = document.createElement('td');
    row_data_4.innerHTML = data[i]['location'];
    let row_data_5 = document.createElement('img');
    if (data[i]['title_image_thumb'] == null){
      row_data_5.alt = " Image not Found";
    }
    else{
      row_data_5.src = data[i]['title_image_thumb'];
    }

    row.appendChild(row_data_1);
    row.appendChild(row_data_2);
    row.appendChild(row_data_3);
    row.appendChild(row_data_4);
    row.appendChild(row_data_5);
    tbody.appendChild(row);
  }
}






