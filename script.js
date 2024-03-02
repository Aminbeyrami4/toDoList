const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemInvalid = document.getElementById("input-invalid");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("items-clear");
const filterItem = document.getElementById("filter");
const formBtn = document.getElementById("btn");
let isEditMode = false;

function displayItems() {
   let itemsFromStorage = getItemFromStorage();

   itemsFromStorage.forEach(item => addItemToDOM(item));

   checkUi();
}
function addItem(e) {
   e.preventDefault();
   
   const newitem = itemInput.value;

   //validate input
   if (newitem === '') {
      itemInvalid.innerText = 'Please add an Item';
      return;
   }else {
      itemInvalid.innerText = '';
   }


   addItemToDOM(newitem);
   addItemToStorage(newitem);

   itemInput.value = '';

   if (isEditMode) {
      const itemEdit = itemList.querySelector('.edit-mode');
      removeItemFormStorage(itemEdit.textContent);

      itemEdit.remove();
      formBtn.innerHTML = "<i class='bi bi-plus'></i> Add item"
      formBtn.classList.replace('btn-primary', 'btn-dark')
      isEditMode = false;
   }else {
      if(checkItemExits(newitem)) {
          itemInvalid.innerText = 'this item alredy exits'
         return;
      }else {
         itemInvalid.innerText = '';
      }
   }

   checkUi();
}

function checkItemExits (item) {
   const  itemFormStorage = getItemFromStorage();

   return itemFormStorage.includes(item);
}

function addItemToDOM (item) {
   const li = document.createElement('li');
   li.className = 'list-item'
   li.textContent = item;

   const icon = createIcon('bi bi-x fs-5 text-danger');

   li.appendChild(icon);

   itemList.appendChild(li);
}
 function addItemToStorage(item) {
   let itemsFromStorage = getItemFromStorage();


   itemsFromStorage.push(item);
   localStorage.setItem('items' , JSON.stringify(itemsFromStorage));
 }
function getItemFromStorage() {
   let itemsFromStorage ;


   if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
   }else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
   }

   return itemsFromStorage;
}


function createIcon(clases){
   const icon = document.createElement('i');
   icon.className = clases

   return icon;
}

function onClickItem(e) {
   // e.target.parentElement.remove();
   if (e.target.classList.contains('bi-x')){
      removeItem(e.target.parentElement);
   }else{
      setItemToEdit(e.target);
   }
}


function removeItemFormStorage(item) {
   let itemsFromStorage = getItemFromStorage();

   itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

   localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
function clearItems(){
   itemList.innerHTML = '';
   localStorage.removeItem('items')
   checkUi();
}

function removeItem(item) {
   item.remove();
   removeItemFormStorage(item.textContent);
   checkUi();
}

function setItemToEdit(item) {
   isEditMode = true;
   itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'))
   item.classList.add('edit-mode');

   itemInput.value = item.textContent;

   formBtn.innerHTML = "<i class='bi bi-pencil-fill'></i> Update item"
   formBtn.classList.replace('btn-dark', 'btn-primary')
}

function checkUi () {
   const items = itemList.querySelectorAll("li");

   if (items.length === 0) {
      clearBtn.style.display = 'none';
      filterItem.style.display ='none';
   } else {
      clearBtn.style.display ='block';
      filterItem.style.display = 'block';
   }

}

function itemFilter (e) {

   const items = document.querySelectorAll('li')
   const text = e.target.value.toLowerCase();

   items.forEach((item) => {
      const itemname = item.firstChild.textContent.toLowerCase();
      if (itemname.indexOf(text) !== -1) {
         item.style.display = 'flex'
      }else {
         item.style.display = 'none'
      }
   })
}
//event Listenr
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
filterItem.addEventListener("input" , itemFilter)
document.addEventListener("DOMContentLoaded", displayItems);
checkUi();