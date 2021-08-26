let isUpdate = false
let contactsObj = {}

window.addEventListener("DOMContentLoaded", (event) => {
  //validate first name
  const name = document.querySelector("#name");
  const nameError = document.querySelector(".name-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      new Contacts().name = name.value;
      nameError.textContent = "";
    } catch (error) {
      nameError.textContent = error;
    }
  });

  //validation for phone number
  const phoneNumber = document.querySelector("#phoneNumber");
  const numberError = document.querySelector(".tel-error");
  phoneNumber.addEventListener("input", function () {
    if (phoneNumber.value.length == 0) {
      numberError.textContent = "";
      return;
    }
    try {
      new Contacts().phoneNumber = phoneNumber.value;
      numberError.textContent = "";
    } catch (error) {
      numberError.textContent = error;
    }
  });

  //validation for zip code
  const zip = document.querySelector("#zip");
  const zipError = document.querySelector(".zip-error");
  zip.addEventListener("input", function () {
    if (zip.value.length == 0) {
      zipError.textContent = "";
      return;
    }
    try {
      new Contacts().zip = zip.value;
      zipError.textContent = "";
    } catch (error) {
      zipError.textContent = error;
    }
  });

  checkForUpdate();
  localStorage.removeItem('contactsEdit')
});

function save() {
  try {
    setContactsObject()
    createAndUpdateStorage()
    resetForm()
    window.location.replace("../pages/AddressBookHome.html")
  } catch (error) {
    alert(error);
  }
}

function setContactsObject() {
  try {
    contactsObj._name = getInputValueById("#name");
  } catch (error) {
    setTextValue(".name-error", error);
    throw error;
  }

  try {
    contactsObj._phoneNumber = getInputValueById("#phoneNumber");
  } catch (error) {
    setTextValue(".tel-error", error);
    throw error
  }
  contactsObj._address = getInputValueById("#address");
  contactsObj._city = getInputValueById("#city");
  contactsObj._state = getInputValueById("#state");
  try {
    contactsObj._zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error
  }
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

function setTextValue(component, problem) {
  let textError = document.querySelector(component);
  textError.textContent = problem;
}

function resetForm() {
  setValue("#name", "");
  setValue("#phoneNumber", "");
  setValue("#address", "");
  setValue("#city", "Select City");
  setValue("#state", "Select State");
  setValue("#zip", "");
}

function setValue(id, value) {
  const element = document.querySelector(id);
  element.value = value;
}

function createAndUpdateStorage() {
  let contactsList = JSON.parse(localStorage.getItem("AddressBook"))
  if (contactsList != undefined) {
    let contactsData = contactsList.find(empData => empData._id == contactsObj._id)
    if(!contactsData){
      contactsList.push(createContactsData())
    }else{
      const index = contactsList.map(empData => empData._id).indexOf(contactsData._id)
      contactsList.splice(index,1,createContactsData(contactsData._id))
    }
  } else {
    contactsList = [createContactsData()]
  }
  alert(contactsList.toString())
  localStorage.setItem("AddressBook",JSON.stringify(contactsList))
}

function createContactsData(id) {
  let contacts = new Contacts()
  if (!id) {
    contacts._id = new Date().getTime()
  }
  else{
    contacts._id = id
  }
  setContactsData(contacts)
  return contacts
}

function setContactsData(contacts) {
  try {
    contacts.name = getInputValueById("#name");
  } catch (error) {
    setTextValue(".name-error", error);
    throw error;
  }

  try {
    contacts.phoneNumber = getInputValueById("#phoneNumber");
  } catch (error) {
    setTextValue(".tel-error", error);
    throw error
  }
  contacts.address = getInputValueById("#address");
  let city = getInputValueById("#city");
  if (city != "Select City") {
    contacts.city = city;
  } else {
    throw "Please select city"
  }
  let state = getInputValueById("#state");
  if (state != "Select State") {
    contacts.state = state;
  } else {
    throw "Please select state"
  }

  try {
    contacts.zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error
  }

  alert(contacts.toString());
  return contacts;
}

  //functions required for updates
function checkForUpdate(){
  const contactsJson = localStorage.getItem('contactsEdit')
  isUpdate = contactsJson ? true : false;
  if(!isUpdate){
    return
  }
  contactsObj = JSON.parse(contactsJson)
  setForm()
}

function setForm() {
  setValue("#name",contactsObj._name)
  setValue("#phoneNumber", contactsObj._phoneNumber);
  setValue("#address", contactsObj._address);
  setValue("#city", contactsObj._city);
  setValue("#state", contactsObj._state);
  setValue("#zip", contactsObj._zip);
}

function setSelectedValue(propertyValue,value){
  let allItems = document.querySelectorAll
  (propertyValue)
  allItems.forEach(item =>{
    if(Array.isArray(value)){
      if(value.includes(item.value)){
        item.checked = true
      }
    }
    else if (item.value == value){
      item.checked = true
    }
  })
}