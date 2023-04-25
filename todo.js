const lists = document.querySelectorAll('.list-items');
const newItem = document.getElementById("newItem");
const lastModified = document.querySelectorAll("#lastModified");
let deletedItem0 = null;
let deletedItem1 = null;
let deletedItem2 = null;

function addItem() {
    'use strict';
    const listSelect = document.getElementById('listSelect');
    const selectedList = lists[listSelect.value];
    if (newItem.value === "") {
        alert("Podaj wartosc");
    } else {
        const li = document.createElement("li");
        const itemText = document.createTextNode(newItem.value);
        const button = document.createElement("button");
        const buttonText = document.createTextNode("X");
        button.appendChild(buttonText);
        li.appendChild(itemText);
        li.appendChild(button);
        selectedList.appendChild(li);
        const date = new Date();
        const dateString = date.toLocaleString();
        const lastModifiedElement = selectedList.closest(".list").querySelector('#lastModified');
        lastModifiedElement.textContent = dateString;
        newItem.value = "";

        button.onclick = function() {
            const date = new Date();
            const dateString = date.toLocaleString();
            if (confirm("Czy na pewno chcesz usunąć ten element?")) {
				if(selectedList == lists[0]) {
					deletedItem0=li;
                    const lastModifiedElement = lists[0].closest(".list").querySelector('#lastModified');
                    lastModifiedElement.textContent = dateString;
				}	
			  	if(selectedList == lists[1]) {
					deletedItem1=li;
                    const lastModifiedElement = lists[1].closest(".list").querySelector('#lastModified');
                    lastModifiedElement.textContent = dateString;
			  	}
				if(selectedList == lists[2]) {
					deletedItem2=li;
                    const lastModifiedElement = lists[2].closest(".list").querySelector('#lastModified');
                    lastModifiedElement.textContent = dateString;
			  	}
              	selectedList.removeChild(li);
            }
          };
    }
}

function toggleList(list) {
    'use strict';
    const listItems = list.nextElementSibling;
    if (listItems.style.display === "none") {
        listItems.style.display = "block";
    } else {
        listItems.style.display = "none";
    }
}

lists.forEach(list => {
    'use strict';
    const header = list.closest(".list").querySelector('.list-header');
    header.addEventListener('click', function() {
        toggleList(this);
    });
    
    list.addEventListener("click", function(ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle('checked');
            const date = new Date();
            const dateString = date.toLocaleString();
            const lastModifiedElement = list.closest(".list").querySelector('#lastModified');
            lastModifiedElement.textContent = dateString;
        }
    });
});

function undoDelete0() {
    'use strict';
	if (deletedItem0) {
		lists[0].appendChild(deletedItem0);
		deletedItem0 = null;
	}
}

function undoDelete1() {
    'use strict';
	if (deletedItem1) {
		lists[1].appendChild(deletedItem1);
		deletedItem1 = null;
	}
}

function undoDelete2() {
    'use strict';
	if (deletedItem2) {
		lists[2].appendChild(deletedItem2);
		deletedItem2 = null;
	}
}
