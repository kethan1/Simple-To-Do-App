const Store = require("electron-store");

const store = new Store();

function AddList(listName) {
    if (store.get(`Simple-To-Do-App.${listName}`) === undefined) {
        store.set(`Simple-To-Do-App.${listName}`, []);
        return "success"
    } else {
        return "name_taken"
    }
}

function GetLists() {
    return store.get("Simple-To-Do-App");
}

function AddItemtoList(listName, item) {
    var tmp_array = store.get(`Simple-To-Do-App.${listName}`);
    tmp_array.push(item);
    store.set(`Simple-To-Do-App.${listName}`, tmp_array);
}

function RemoveItemfromList(listName, item) {
    var tmp_array = store.get(`Simple-To-Do-App.${listName}`);
    var tmp_array2 = tmp_array.filter(function(value) { 
        return value !== item;
    });
    store.set(`Simple-To-Do-App.${listName}`, tmp_array2);
}

function DeleteList(listName) {
    store.delete(`Simple-To-Do-App.${listName}`)
}
