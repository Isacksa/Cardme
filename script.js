function abrir(){
    if ($(this).hasClass("aberta")){
        $(this).removeClass("aberta");
    }else{
        $(this).addClass("aberta");
    }
}
function sortearCor(){
    c = ["vermelho","amarelo","azul","roxo","laranja"];
    cc = c[Math.floor(Math.random() * c.length)];
    $(this).addClass(cc);
}

$(document).ready(function(){
    //Gerando 15 cartas na tela (5*3=15)
    for (j=0;j<5;j++){
        var txt = '<div class="cartas-container-row">';
        for (i=0;i<3;i++){
            $.getJSON("./perguntas.json", function(data){
                $.each(result, function(f, field){
                    console.log(field + " ");
                });
            });
            txt += '<div class="carta"><div class="carta-conteudo">';
            txt += '<div class="carta-frente"><h1>Pergunta 1</h1><p>Bla bla bla</p></div>'
            txt += '<div class="carta-verso"><h1>Resposta</h1><p>plim plim plum</p></div>'
            txt += '</div></div>';
        }
        txt += "</div>";
        $("#cartas-container").append(txt);
    }
    //Para cada carta, sortear uma cor e fazer com que ela abra ao clicar
    $(".carta").each(sortearCor);
    $(".carta").click(abrir);
});