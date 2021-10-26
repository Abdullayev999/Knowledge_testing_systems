function answersUnique(arr)
{
    var n = arr.length;
    for (var i = 0; i < n-1; i++)
    { for (var j = i+1; j < n; j++)
    { if (arr[ i ] === arr[j]) return false; }
    }
    return true;
}

//document.forms.myForm.addEventListener('submit',function () {
//  event.preventDefault();
//let btn = document.getElementById('save');
//btn.disabled = false;
//})



document.querySelector('#listAnswers').addEventListener('click',function () {
    let arr = [];
    let list = document.querySelectorAll(".listAnswers");
    for (const listElement of list) {
        let text = listElement.options[listElement.selectedIndex].text;
        arr.push(text);
    }
    if (answersUnique(arr)){
        document.querySelector('#save').disabled = false;
        document.querySelector('#msg').hidden = true;
    }else{
        document.querySelector('#msg').hidden = false;
        document.querySelector('#save').disabled = true;
    }

})


document.getElementById('item3').addEventListener('click', function () {

    if (event.target.name == 'remove' && document.getElementById('gridRadios3').checked==false) {
        event.currentTarget.remove();
    }
})
document.getElementById('item4').addEventListener('click', function () {

    //console.log(document.querySelector('#listAnswers').childElementCount)
    if (event.target.name == 'remove' && document.getElementById('gridRadios4').checked==false) {
        document.querySelector("#remove3").hidden = false;
        event.currentTarget.remove();
    }
})
document.getElementById('item5').addEventListener('click', function () {
    //console.log(document.querySelector('#listAnswers').childElementCount)
    if (event.target.name == 'remove'  && document.getElementById('gridRadios5').checked==false) {
        document.querySelector("#remove4").hidden = false;
        event.currentTarget.remove();
    }
})
