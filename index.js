$(document).ready ( function() {
    let n = 4;
    let i = 0;
    while (i < n){
        let inputLetter = document.createElement("input");
        inputLetter.type = 'text';
        inputLetter.className = 'inputLet';
        inputLetter.id = 'let' + i
        $('.input').append(inputLetter);
        i += 1;
    }
//    let word = "орех"
    $('.check').click( function(){
        let i = 0;
        let tryWord = "";
        while (i < n){
            console.log('#let'+i);
            console.log($('#let' + i).value);
            tryWord += $('#let' + i).value;
            i += 1;
        }
        console.log(tryWord);
    });
});