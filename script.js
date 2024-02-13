const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemInvalid = document.getElementById("input-invalid");

function addItem(e) {
   e.preventDefault();
   
   const newitem = itemInput.value;

   //validate input
   if (newitem == '') {
      itemInvalid.innerText = 'Please add an Item'
   }
}

//event Listenr
itemForm.addEventListener("submit", addItem);
