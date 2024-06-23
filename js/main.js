var bookmarkName = document.getElementById('name')
var websiteUrl = document.getElementById('url')
var submit = document.getElementById('submit')
var tabelBody = document.getElementById('tabelBody')
var stylecss = document.querySelectorAll('.form-control:focus')
var bookmarkList =[] ;


if(localStorage.getItem("bookmarkList" == null)){
  bookmarkList = []
}else{
  bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')) 
}

submit.onclick = function(){
  
  var bookMark = {
    name : bookmarkName.value,
    url : websiteUrl.value,
  }

  // console.log(bookmarkList);
  bookmarkList.push(bookMark)
  localStorage.setItem('bookmarkList' , JSON.stringify(bookmarkList))
  display()
  clearForm()
}


function display(){
  var marks = ''
  for(var i = 0 ; i < bookmarkList.length ; i++){
    marks+=`
      <tr>
        <td >${i}</td>
        <td>${bookmarkList[i].name}</td>
        <td><a href="${bookmarkList[i].url}"><button class="btn btn-primary">Visit</button></a></td>
        <td><button onclick="deletebookmark(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
    `
  }
  tabelBody.innerHTML = marks 

  }
  
  
  function deletebookmark(index){
    bookmarkList.splice(index,1);
    localStorage.setItem('bookmarkList' , JSON.stringify(bookmarkList))
    display()
}

function clearForm(){
  bookmarkName.value = null
  websiteUrl.value = null
}


var bookmarkNameRegex = /^[A-Za-z]{3,}$/

function isNameValid(){
  if(bookmarkNameRegex.test(bookmarkName.value)){
    stylecss =  document.body.style.cssText = `color:#abcdef`
    console.log('true');
    return true ; 
    
  }else{
    console.log('false');
    return false;
  }
}



var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/

function isurlValid(){
  if(urlRegex.test(websiteUrl.value)){
    console.log('true');
    return true ; 
  }else{
    console.log('false');
    return false;
  }
}


bookmarkName.onkeyup = function(){
  if(isurlValid && isNameValid){
    submit.removeAttribute("disabled")
    isNameValid() 
  }else{
    submit.disabled = 'true'  
  }
}

websiteUrl.onkeyup = function(){
  if(isurlValid && isNameValid){
    submit.removeAttribute("disabled")
    isurlValid()
  }else{
    submit.disabled = 'true'  
  }
}
