//M
let ShoppingList = ['Brød', 'Melk', 'Egg', 'ost'];
let deleted = [];
let isAdding = false;
let itemInput;
//V
updateView()
function updateView() {
    let html = '';
    for(let i = 0; i < ShoppingList.length; i++){
        let ShoppingListItem = ShoppingList[i]
        html += /*HTML*/`
            <div class="ShoppingItem">
                <div>🞄 ${ShoppingListItem}</div>
                <button onclick="deleteItem(${i})">x</button>
            </div>
        `;

    }
    document.getElementById('app').innerHTML = /*HTML*/ `
        <div class="container">
            <h3>Handleliste</h3>
            <button onclick="undo()">⤶</button>
            ${createNewShoppingItem()}
            <div class="shoppingList">
                ${html}
            </div>
        </div>
    `;
}

function createNewShoppingItem() {
    if(isAdding) {
        return /*HTML*/`
            <div class="inputBox">
                <input  
                    type="text"
                    oninput="itemInput=this.value"
                    value="${itemInput ?? ''}" 
                    />
                <button onclick="addItem()">Legg til</button>
                <button onclick="cancelAddItem()">Avbryt</button>
            </div>    
        `;
    } else {
        return /*HTML*/ `
            <button onclick="startAdd()">+</button>
        `;
    }
}



//C
function addItem() {
    if(!itemInput) return;
    ShoppingList.push(itemInput);
    isAdding = false;
    itemInput = null;
    updateView();
}

function deleteItem(i) {
    const items = ShoppingList.splice(i, 1);
    deleted.push(items[0]);
    updateView();
}

function undo() {
    
    if(deleted.length === 0 ) {
        return;
    } else {
    const item = deleted.pop();

    ShoppingList.push(item);
    updateView();
    }
}

function startAdd() {
    isAdding = true;
    updateView();
}

function cancelAddItem() {
    isAdding = false;
    updateView();
}
