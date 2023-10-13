//Função para abrir e fechar cards
function abrir(){
    if ($(this).hasClass("aberta")){
        $(this).removeClass("aberta");
    }else{
        $(this).addClass("aberta");
    }
}

//Função para sortear as cores dos cards
var corLista = ["vermelho","amarelo","azul","roxo","laranja","verde"];
function sortearCor(){
    corEscolhida = Math.floor(Math.random() * corLista.length);
    $(this).addClass(corLista[corEscolhida]);
    corLista.splice(corEscolhida,1);
    if (corLista.length == 0){
        corLista = ["vermelho","amarelo","azul","roxo","laranja","verde"];
    }
}

$(document).ready(function(){
    //Obter perguntas do JSON
    var cols = 0;
    $.getJSON("./perguntas.json", function (data) {
        $.each(data, function(key, val) {
            //Encontrar perguntas
            var txt = "";
            if (key == "lista"){
                $.each(val, function(pk, pv) {
                    //Iniciar linha se for a primeira carta da linha
                    if (cols == 0){
                        txt += '<div class="cartas-container-row">';
                    }

                    //Criar carta
                    txt += '<div class="carta"> \
                                <div class="carta-conteudo"> \
                                    <div class="carta-frente"> \
                                        <h1>' + pv.pergunta + '</h1> \
                                        <p>' + pv.descricao + '</p> \
                                    </div> \
                                <div class="carta-verso"> \
                                    <h1>' + pv.resposta + '</h1> \
                                    <p>' + pv.explicacao + '</p> \
                                </div> \
                            </div> \
                        </div>';

                    //Fechar linha se for a última carta da linha
                    if (cols == 2){
                        txt += "</div>";
                        cols = 0;
                    }else{
                        cols++;
                    }
                });
            }
            $("#cartas-container").append(txt);
        });

        //Para cada carta, sortear uma cor e fazer com que ela abra ao clicar
        $(".carta").each(sortearCor);
        $(".carta").click(abrir);
    });
});