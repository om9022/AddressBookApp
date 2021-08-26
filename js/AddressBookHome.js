let contactsLists
window.addEventListener("DOMContentLoaded", (event) => {
    contactsLists = getContactsFromStorage()
    document.querySelector(".contacts-count").textContent = contactsLists.length
    createInnerHtml();
});

const getContactsFromStorage = () =>{
    return localStorages.getItem('AddressBook') ? 
    JSON.parse(localStorages.getItem('AddressBook')) : []
}

const createInnerHtml = () => {
    if (contactsLists.length == 0) {
        return
    }
    const headerHtml = `<tr>
    <th>Name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th>Phone Number</th>
    </tr>`;
    let innerHtml = `${headerHtml}`
    for (const contacts of contactsLists)
    {
        innerHtml = `${innerHtml} 
        <tr>
        <td>${contacts._name}</td>
        <td>
            ${contacts._address}
        </td>
        <td>${contacts._city}</td>
        <td>${contacts._state}</td>
        <td>${contacts._zip}</td>
        <td>${contacts._phoneNumber}</td>
        <td>
            <img src="../assets/icon/delete-black-18dp.svg" alt="delete" id="${contacts._id}" onclick="remove(this)">
            <img src="../assets/icon/create-black-18dp.svg" alt="update" id="${contacts._id}" onclick="update(this)">
        </td>
        </tr>`;   
    }
    document.querySelector('#table-display').innerHTML = innerHtml
};

const getDeptHtml = (deptList) =>{
    let depthtml= "";
    for (const dept of deptList){
        depthtml = `${depthtml} <div class="dept-label">${dept}</div>`
    }
    return depthtml
}

function remove(node) {
    let removeContacts = contactsLists.find(contacts => contacts._id == node.id)
    if (!removeContacts) {
        return
    }
    const index = contactsLists.map(contacts => contacts._id).indexOf(removeContacts._id)
    contactsLists.splice(index, 1); 
    localStorages.setItem("AddressBook",JSON.stringify(contactsLists))
    document.querySelector(".contacts-count").textContent = contactsLists.length
    createInnerHtml();
}

function update(node) {
    let contactsEdit = contactsLists.find(empData => empData._id == node.id)
    if (!contactsEdit) {
        return
    }
    localStorages.setItem('contactsEdit',JSON.stringify(contactsEdit))
    window.location.replace("../pages/AddressBookForm.html")
  }