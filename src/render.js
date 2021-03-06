var Store = null;
var store = null;

function get_store() {
    if (Store === null) {
        Store = require("electron-store");
        store = new Store();
    }
    return store;
}

function AddList(listName) {
    if (get_store().get(`Simple-To-Do-App.${listName}`) === undefined) {
        get_store().set(`Simple-To-Do-App.${listName}`, []);
        return "success"
    } else {
        return "name_taken"
    }
}

function GetLists() {
    return get_store().get("Simple-To-Do-App");
}

function AddItemtoList(listName, item) {
    var tmp_array = get_store().get(`Simple-To-Do-App.${listName}`);
    tmp_array.push(item);
    get_store().set(`Simple-To-Do-App.${listName}`, tmp_array);
}

function RemoveItemfromList(listName, item) {
    var tmp_array = get_store().get(`Simple-To-Do-App.${listName}`);
    var tmp_array2 = tmp_array.filter(function(value) { 
        return value !== item;
    });
    get_store().set(`Simple-To-Do-App.${listName}`, tmp_array2);
}

function EditItem(listName, item, newItem) {
    var tmp_array = get_store().get(`Simple-To-Do-App.${listName}`)
    tmp_array[tmp_array.indexOf(item)] = newItem;
    get_store().set(`Simple-To-Do-App.${listName}`, tmp_array)
}

function DeleteList(listName) {
    get_store().delete(`Simple-To-Do-App.${listName}`)
}

function get_Save_Div_Heights() {
    return get_store().get("Save_Div_Heights")
}

function set_Save_Div_Heights(value) {
    get_store().set("Save_Div_Heights", value)
}
