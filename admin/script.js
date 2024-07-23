const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
    sidebar = body.querySelector("nav");
    sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})


//table functionalities

let checked = 0;
    let multiple_deletion = document.getElementById("multiple_deletion");
    let select_all_checkboxes = document.getElementById("select_all_checkboxes");
    let delete_checkbox = document.getElementsByClassName("delete_checkbox");
    let more_icons = document.getElementsByClassName("more-icon");
    let remove_buttons = document.getElementsByClassName("remove-button");
    let messages = document.getElementsByClassName("message");

    select_all_checkboxes.addEventListener("click", function() {
      for (let i = 0; i < delete_checkbox.length; i++) {
        if (select_all_checkboxes.checked === true) {
          highlightAllTableRows();
          delete_checkbox[i].checked = true;
          checked++;
        } else {
          removeTableRowsHighlight();
          delete_checkbox[i].checked = false;
          checked--;
        }
      }
      if (select_all_checkboxes.checked === true) {
        multiple_deletion.style.display = "block";
      } else {
        multiple_deletion.style.display = "none";
      }
    });

    for (let i = 0; i < delete_checkbox.length; i++) {
      delete_checkbox[i].addEventListener("click", function(event) {
        if (event.target.checked === true) {
          highlightTableRow(event.target);
          checked += 1;
        } else if (event.target.checked === false) {
          select_all_checkboxes.checked = false;
          removeTableRowHighlight(event.target);
          checked -= 1;
        }
        if (checked < 0) {
          checked = 0;
        }
      });
    }

    multiple_deletion.addEventListener("click", function() {
      let rows_to_delete = [];
      for (let i = 0; i < delete_checkbox.length; i++) {
        if (delete_checkbox[i].checked === true) {
          rows_to_delete.push(delete_checkbox[i].parentNode.parentNode);
        }
      }
      for (let i = 0; i < rows_to_delete.length; i++) {
        rows_to_delete[i].remove();
      }
      checked = 0;
      multiple_deletion.style.display = "none";
    });

    for (let i = 0; i < more_icons.length; i++) {
      more_icons[i].addEventListener("click", function(event) {
        let row = event.target.closest("tr");
        let checkbox = row.querySelector(".delete_checkbox");
        let remove_button = row.querySelector(".remove-button");
        let message = row.querySelector(".message");

        if (checkbox.checked) {
          remove_button.style.display = "inline";
          message.style.display = "none";
          event.target.style.display = "none";
        } else {
          message.style.display = "inline";
        }
      });
    }

    for (let i = 0; i < remove_buttons.length; i++) {
      remove_buttons[i].addEventListener("click", function(event) {
        let row = event.target.closest("tr");
        row.remove();
        checked -= 1;
        if (checked < 0) {
          checked = 0;
        }
        if (checked === 0) {
          multiple_deletion.style.display = "none";
        }
      });
    }

    document.addEventListener("click", function(event) {
      for (let i = 0; i < more_icons.length; i++) {
        let row = more_icons[i].closest("tr");
        let checkbox = row.querySelector(".delete_checkbox");
        let remove_button = row.querySelector(".remove-button");
        let message = row.querySelector(".message");

        if (!row.contains(event.target)) {
          remove_button.style.display = "none";
          message.style.display = "none";
          more_icons[i].style.display = "inline";
        }
      }
    });

    function highlightAllTableRows() {
      let rows = document.getElementById("orders-table").rows;
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.add("highlight");
      }
    }

    function removeTableRowsHighlight() {
      let rows = document.getElementById("orders-table").rows;
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("highlight");
      }
    }

    function highlightTableRow(checkbox) {
      checkbox.parentNode.parentNode.classList.add("highlight");
    }

    function removeTableRowHighlight(checkbox) {
      checkbox.parentNode.parentNode.classList.remove("highlight");
    }



   // Get the modal container and content elements for top up
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('.modal-content');

// Get the close modal icon and plus icon elements
const closeModalIcon = document.querySelector('#close-modal');
const openModalIcon = document.querySelector('#open-modal');

// Add event listeners to the close modal icon and plus icon
closeModalIcon.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});

openModalIcon.addEventListener('click', () => {
  modalContainer.style.display = 'block';
  modalContent.style.top = '50%';
  modalContent.style.transform = 'translateY(-50%)';
  modalContent.style.width = '450px';
  modalContent.style.height = '560px';
});





// Get modal elements for cart modal
const modalContainerNew = document.querySelector('.modal-container-new');
const openModalIconNew = document.querySelector('#open-modal-new');
const closeModalIconNew = document.querySelector('#close-modal-new');

// Show the modal
openModalIconNew.addEventListener('click', () => {
  modalContainerNew.style.display = 'flex';
});

// Hide the modal
closeModalIconNew.addEventListener('click', () => {
  modalContainerNew.style.display = 'none';
});

// Update quantity and total
function updateQuantityNew(button, change) {
  const quantityElemNew = button.parentElement.querySelector('.quantity-new');
  const priceElemNew = button.parentElement.previousElementSibling;
  const totalElemNew = button.parentElement.nextElementSibling;
  
  let quantityNew = parseInt(quantityElemNew.textContent);
  const priceNew = parseFloat(priceElemNew.textContent.replace('$', ''));
  
  quantityNew += change;
  if (quantityNew < 1) quantityNew = 1;
  
  quantityElemNew.textContent = quantityNew;
  totalElemNew.textContent = `$${(priceNew * quantityNew).toFixed(2)}`;
  
  updateSubtotalNew();
}

// Remove cart item
function removeCartItemNew(button) {
  const rowNew = button.parentElement.parentElement;
  rowNew.remove();
  updateSubtotalNew();
}

// Update subtotal
function updateSubtotalNew() {
  const totalElemsNew = document.querySelectorAll('.total-new');
  let subtotalNew = 0;
  
  totalElemsNew.forEach(totalElemNew => {
    subtotalNew += parseFloat(totalElemNew.textContent.replace('$', ''));
  });
  
  document.querySelector('.subtotal-new').textContent = `Subtotal: $${subtotalNew.toFixed(2)}`;
}

// Continue shopping
function continueShoppingNew() {
  document.querySelector('.modal-container-new').style.display = 'none';
}