function createInputField (n, sizeField) {
        let inputField = document.createElement("div");
        inputField.className = "inputField";
        inputField.style.width = "" + sizeField + "px";
        inputField.style.height = "" + sizeField + "px";
        let inputForm = document.createElement("form");
        inputForm.name = 'inputWord';
        inputForm.className = 'inputWord';
        let i = 0;
        while (i < n){
            let inputLetter = document.createElement("input");
            inputLetter.name = "let" + i;
            inputLetter.type = 'text';
            inputLetter.maxLength = "1";
            inputLetter.className = "inputLetter";
            inputLetter.style.width = "" + (sizeField - n*20)/n + "px";
            inputForm.append(inputLetter);
            i += 1;
        }
        inputField.append(inputForm)
        let info = document.createElement("div")
        info.className = "info";
        info.append("Here will be information");
        inputField.append(info);
        let checkBut = document.createElement("input");
        checkBut.type = "button";
        checkBut.name = "check";
        checkBut.value = "Check!";
        checkBut.className = "check";
        checkBut.style.width = "" + (sizeField - n*20)/n * 1.5 + "px";
        checkBut.style.height = "" + (sizeField - n*20)/n + "px";
        inputField.append(checkBut);
        $('.body').append(inputField);
}

function createColumn(countColumn){
    let column = document.createElement("td");
    let firstRow = document.createElement("tr");
    column.className = "columnHistory";
    column.id = "column" + countColumn;
    let wordTh = document.createElement("th");
    wordTh.scope = "row";
    wordTh.append("word");
    firstRow.append(wordTh);
    let bullsTh = document.createElement("th");
    bullsTh.scope = "row";
    bullsTh.append("bulls");
    firstRow.append(bullsTh);
    let cowsTh = document.createElement("th");
    cowsTh.scope = "row";
    cowsTh.append("cows");
    firstRow.append(cowsTh);
    column.append(firstRow);
    $('.history').append(column)

}

function saveData(data){
    rusWords.rus = json.parse(data);
    return data;
}
function importWords(){
    let data = "";
    // Создаем объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // Настраиваем запрос
    xhr.open('GET', 'russianWords.json', true);
    // Обрабатываем ответ
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Обработка данных
            data = JSON.parse(xhr.responseText);
            console.log(data);
        }
    };
    // Отправляем запрос
    xhr.send();
    console.log(data);
    return data;
}
function filterWords(n, rusWords){
    let i = 0;
    let goodWords = [];
    console.log(rusWords.length);
    while (i < rusWords.length){
        russianWord = rusWords.at(i);
        console.log(russianWord);
        if (russianWord.length == n){
            goodWords.push(russianWord);
        }
        i += 1;
    }
    console.log(goodWords);
}


$(document).ready ( function() {
    let n = 5;
    let sizeField = 400;
    createInputField(n, sizeField);
    let history = document.createElement("div");
    history.className = 'history';
    history.style.width = "" + ($('.inputField')[0].offsetWidth + 10) + "px";
    history.style.height = "" + ($('.inputField')[0].offsetHeight - 40) + "px";
    history.style.position = "absolute";
    history.style.left = "" + $('.inputField')[0].offsetWidth + "px";
    $('.body').append(history);
    let countColumn = 0;
    let countRow = 0;
    let rusWords = importWords();
    console.log(rusWords)
//    filterWords(n)
    let word = "games";
    $('.check').click(function(){
        let inputWord = "";
        let form = document.forms.inputWord;
        for (let i = 0; i < n; i++){
            inputWord += form.elements[i].value;
        }
        inputWord = inputWord.toLowerCase();
        console.log(inputWord)
        let flag = true;
        if (new Set(inputWord).size != n){
            $('.info').empty();
            $('.info').append("Wrong word");
            flag = false;
        }
        else{
            let cows = 0;
            let bulls = 0;
            for (let i = 0; i < n; i++){
                if (word[i] == inputWord[i]){
                    bulls++;
                }
                else if (word.includes(inputWord[i])){
                    cows++;
                }
            }
            console.log(bulls);
            console.log(cows);
            $('.info').empty();
            if (bulls != n){
                $('.info').append("Found " + bulls + " bulls and " + cows + " cows.");
            } else {
                $('.info').append("Hooray! You win!")
            }
            countRow %= 13;
            if (countRow == 0){
                countColumn++;
                createColumn(countColumn);
            }
            let line = document.createElement("tr");
            let wordTd = document.createElement("td");
            wordTd.append(inputWord);
            line.append(wordTd);
            let bullsTd = document.createElement("td");
            bullsTd.append(bulls);
            line.append(bullsTd);
            let cowsTd = document.createElement("td");
            cowsTd.append(cows);
            line.append(cowsTd);
            $('#column' + countColumn).append(line)
            countRow++;
        }
    });

});