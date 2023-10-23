//Função para abrir e fechar cards
function abrir(){
    if ($(this).hasClass("aberta")){ //se já tiver aberta, remover a classe "aberta"
        $(this).removeClass("aberta");
    }else{
        $(this).addClass("aberta"); //se não estiver aberta, adicionar a classe "aberta"
    }
}

//Função para sortear as cores dos cards
var corLista = ["vermelho","amarelo","azul","roxo","laranja","verde"];
function sortearCor(){
    //número aleatório de acordo com tamanho da lista
    corEscolhida = Math.floor(Math.random() * corLista.length);
    
    //o elemento que chamou a função sortearCor vai receber
    //uma classe de acordo cor a cor que foi sorteada
    $(this).addClass(corLista[corEscolhida]);

    //Para evitar muitas cores repetidas em uma mesma linha,
    //as cores vão sendo tiradas da lista até zerar e reiniciar.
    corLista.splice(corEscolhida,1);
    if (corLista.length == 0){
        corLista = ["vermelho","amarelo","azul","roxo","laranja","verde"];
    }
}

$(document).ready(function(){
    //Obter perguntas do arquivo .JSON.
    //Tudo só funciona se for feito dentro da função getJSON, pois
    //depois que você termina de ler o arquivo JSON, os dados somem
    var cols = 0;
    $.getJSON("./json/perguntas.json", function (data) {

        //Encontrar pela lista de perguntas dentro do arquivo JSO
        $.each(data, function(key, val) {
            var txt = "";
            if (key == "lista"){
                
                //Para cada valor da lista, fazer o que segue abaixo:
                $.each(val, function(pk, pv) {
                    //Iniciar linha se for a primeira carta da linha
                    if (cols == 0){
                        txt += '<div class="cartas-container-row">';
                    }

                    //Criar carta puxando os dados do arquivo JSON.
                    //.carta-frente contém a pergunta e a descrição
                    //.carta-verso contém a resposta e a explicação
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
            //Todo o texto HTML gerado é adicionado ao div#cartas-container
            $("#cartas-container").append(txt);
        });

        //Para cada carta, sortear uma cor e fazer com que ela abra ao clicar
        var anidelay = 0;
        $(".carta").each(sortearCor);
        $(".carta").each(function(){
            $(this).css("animation-delay","." + anidelay + "s");
            anidelay++;
        });
        $(".carta").click(abrir);
    });
});