
/* определение элементов ДОМа куда будем рендерить */
var description = document.getElementById('description');
var fullInfo1 = document.getElementById('mainBlock');
var form = document.getElementById('form');
var input = document.getElementById('item-name')

/* запрос на лок сервер и получение данных из json */
var requestURL = 'http://127.0.0.1:5500/clients.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
  var data = request.response;
  showData(data);

}

/* конструирование списка кандидатов и его рендеринг  */
function showData(dataObj) {
  this.dataN = dataObj;
  for (var i = 0; i < dataObj.length; i++) {

    var personNote = document.createElement('div');
    var avatarPerson = document.createElement('img');
    var firstNamePerson = document.createElement('div');
   
    personNote.classList.add('wrappDescNote');
    personNote.setAttribute('idkey', i);
    avatarPerson.setAttribute('src', dataObj[i].general.avatar);
    avatarPerson.classList.add('avatarSideBar');
    firstNamePerson.classList.add('firstNamePerson');
    
    firstNamePerson.textContent = dataObj[i].general.firstName + " " + dataObj[i].general.lastName;
    
    personNote.appendChild(avatarPerson);
    personNote.appendChild(firstNamePerson);
    description.appendChild(personNote);
  }
  document.querySelector('.wrappDescNote').classList.add('active');
}


/* по клику найти и удалить класс active затем навесить на выбранный элемент
 */
description.onclick = function (event) {
  document.querySelector('.active').classList.remove('active');
  if (event.target.classList.contains('active')) return;
  event.target.parentNode.classList.add('active');
  fullInfo(dataN);
}

/* конструирование основной инфы активного элемента и ее рендеринг */
function fullInfo(dataN) {
  fullInfo1.innerHTML = "";
  AAA = document.querySelector('.active').getAttribute('idkey');
  let fullInfowrap = document.createElement('div');
  let avatarfullInfo = document.createElement('img');
  let wrapfullInfotext = document.createElement('div');
  let fullInfotext1 = document.createElement('h1');
  let fullInfotext2 = document.createElement('p');
  let fullInfotext3 = document.createElement('p');
  let fullInfotext4 = document.createElement('p');
  let fullInfotext5 = document.createElement('p');
  wrapfullInfotext.classList.add('wrapfullInfotext');
  avatarfullInfo.setAttribute('src', dataN[AAA].general.avatar);
  avatarfullInfo.classList.add('avatarfullInfo');
  fullInfotext1.textContent = dataN[AAA].general.firstName + " " + dataN[AAA].general.lastName;
  fullInfotext2.textContent = dataN[AAA].contact.email;
  fullInfotext3.textContent = "company:" + " " + dataN[AAA].job.company;
  fullInfotext4.textContent = "JOB:" + " " + dataN[AAA].job.title;
  fullInfotext5.textContent = "CITY: " + dataN[AAA].address.city;
  fullInfowrap.classList.add('fullInfowrap');
  fullInfowrap.appendChild(avatarfullInfo);
  wrapfullInfotext.appendChild(fullInfotext1);
  wrapfullInfotext.appendChild(fullInfotext2);
  wrapfullInfotext.appendChild(fullInfotext3);
  wrapfullInfotext.appendChild(fullInfotext4);
  wrapfullInfotext.appendChild(fullInfotext5);
  fullInfowrap.appendChild(wrapfullInfotext);
  fullInfo1.appendChild(fullInfowrap);
};

/* ******ПОИСК******* */
function stopDefAction(event) {
  event.preventDefault();
}

form.addEventListener(
  'submit', stopDefAction, false);

input.addEventListener('keydown', valueInput);
function valueInput(event) {
  var searchField = this.value;
  if (event.keyCode === 13) {
    description.innerHTML = "";
    var myReg = new RegExp(searchField, "i");

    for (i = 0; i < dataN.length; i++) {
      if (dataN[i].general.firstName.search(myReg) !== -1 || dataN[i].general.lastName.search(myReg) !== -1) {
        function showDataSearch() {
          var personNote = document.createElement('div');
          var avatarPerson = document.createElement('img');
          var firstNamePerson = document.createElement('div');
          personNote.classList.add('wrappDescNote');
          personNote.setAttribute('idkey', i);
          avatarPerson.setAttribute('src', dataN[i].general.avatar);
          avatarPerson.classList.add('avatarSideBar');
          firstNamePerson.textContent = dataN[i].general.firstName + " " + dataN[i].general.lastName;
          firstNamePerson.classList.add('firstNamePerson');
          personNote.appendChild(avatarPerson);
          personNote.appendChild(firstNamePerson);
          description.appendChild(personNote);
          document.querySelector('.wrappDescNote').classList.add('active');
        }
        showDataSearch();
      };
    }
  }
}