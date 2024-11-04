let title = document.getElementById('title');

let price = document.getElementById('price');

let taxes = document.getElementById('taxes');

let ads = document.getElementById('ads');

let discount = document.getElementById('discount');

let total = document.getElementById('total');

let count = document.getElementById('count');

let category = document.getElementById('category');

let submit = document.getElementById('submit');

let mood = 'create';

let tmp; 
// get total


function getTotal() {
  // Tab to edit
  
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
}


// creat product 
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
 

submit.onclick = function () {
  // Tab to edit
  let newPro = {
    title : title.value.toLowerCase(),
    price: price.value,
    taxes : taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase()
  } 
  if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
        // Tab to edit
          dataPro.push(newPro);
        }
    
      } else {
        dataPro.push(newPro);
      }
  }
  
  else {
    dataPro[   tmp    ] = newPro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }
clearData();
}
  
  
  
  
  
  
  
  
  
  localStorage.setItem('product',  JSON.stringify(dataPro)   )
  clearData()
  showData()
}

// save localstorage
// clear inputs

function clearData() {
  // Tab to edit
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.value = '';
  count.value = '';
  category.value = '';
}
// read
function showData() {
  // Tab to edit
  getTotal();
  let tabel = '';
  for (let i = 0; i < dataPro.length; i++) {
    tabel += `
      <tr>
         <td>${i+1}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
       
         <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>
    `;
    
  }
  let btnDelet = document.getElementById('deleteAll');
  
  document.getElementById('tbody').innerHTML = tabel;
  
  if (dataPro.length > 0) {
    btnDelet.innerHTML = `
      <button onclick="deletAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelet.innerHTML = '';
  }
}
showData();
// count
// delet
function deleteData(i) {
  // Tab to edit
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
  
}
function deletAll() {
  // Tab to edit
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;

  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  category.value = dataPro[i].category;
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior: 'smooth'
    
  })
}
// search

let searchMood = 'title';

function getSearchMood(id) {
  // Tab to edit
  let search = document.getElementById('search'); 
  if (id == 'searchTitle') {
    searchMood = 'title';
    
  } else {
    searchMood = 'category';
    
  }
  search.placeholder = 'Search by '+ searchMood;
search.focus();
search.value = '';
showData();
}

function searchData(value) {
  // Tab to edit
  let tabel = '';
  for (let i = 0; i < dataPro.length; i++) {
  if (searchMood == 'title') {
  
    
      if (dataPro[i].title.includes(value.toLowerCase())) {
        
        
        tabel += `
          <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
       
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      
      // Tab to edit
    }
  } else {
    
      if (dataPro[i].category.includes(value.toLowerCase())) {
        console.log(i)
        
        tabel += `
          <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
       
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
      // Tab to edit
  
    
  }
}
  document.getElementById('tbody').innerHTML = tabel;
}





// clear data
  
  
  
  

