function ReadTable() {
    let arr = [];
    let trs = document.querySelectorAll('tr');
    for (let i = 1; i < trs.length; i++) {
        let textArr = trs[i].innerText.split('\t');
        let obj = {};
        obj.user = textArr[0];
        obj.role = textArr[1];
        obj.category = textArr[2];
        obj.countQuestions = textArr[3];
        obj.countIsRight = textArr[4];
        obj.grade = textArr[5];

        arr.push(obj);
    }
    return arr;
}

function FillTable(arr) {
    let tbody = document.querySelector('#tableBody');
    tbody.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let htmlTemplate = document.querySelector('#template').innerHTML;
        let template = Handlebars.compile(htmlTemplate);


        let html = template({
            user: arr[i].user,
            role: arr[i].role,
            category: arr[i].category,
            countQuestions: arr[i].countQuestions,
            countIsRight: arr[i].countIsRight,
            grade: arr[i].grade
        })

        tbody.insertAdjacentHTML('beforeend', html);
    }
}


function SortUser(a, b) {
    if (a.user > b.user) {
        return 1;
    }
    if (a.user < b.user) {
        return -1;
    }
    return 0;
}

function SortRole(a, b) {
    if (a.role > b.role) {
        return 1;
    }
    if (a.role < b.role) {
        return -1;
    }
    return 0;
}

function SortCategory(a, b) {
    if (a.category > b.category) {
        return 1;
    }
    if (a.category < b.category) {
        return -1;
    }
    return 0;
}

function SortCountQuestion(a, b) {
    return a.countQuestions - b.countQuestions;
}

function SortCountIsRight(a, b) {
    return a.countIsRight - b.countIsRight;
}
function SortGrade(a, b) {
    return a.grade - b.grade;
}





let th = document.querySelectorAll('thead th');
for (const iterator of th) {
    iterator.addEventListener('click', function() {
        let arr = ReadTable();
        switch (event.target.innerText) {
            case 'User':
                arr.sort(SortUser);
                break;
            case 'Role':
                arr.sort(SortRole);
                break;
            case 'Category':
                arr.sort(SortCategory);
                break;
            case 'Count Question':
                arr.sort(SortCountQuestion);
                break;
            case 'Count is right':
                arr.sort(SortCountIsRight);
                break;
            case 'Grade':
                arr.sort(SortGrade);
                break;
            default:
                break;
        }

        FillTable(arr);
    })
}