class Tarefa{
    nome;
    feito;

    constructor(nome, feito){
        this.nome = nome;
        this.feito = feito;
    }
}

let lista = [];

$(document).ready(()=>{

    $("#formularioSalvar").submit((event) => {

        if (localStorage.getItem("lista") != null) {
            lista = JSON.parse(localStorage.getItem("lista"));
        }

        let nome = $("#tarefa").val().trim();
        let feito = false;

        let tarefa = new Tarefa(nome, feito);

        let isValid = true;

        if(lista.length >= 1){
            for (i = 0; i < lista.length; i++) {
                if (tarefa.nome == lista[i].nome) {
                    isValid = false;
                }
            }
        }

        if (isValid) {

            lista.push(tarefa);

            localStorage.setItem("lista", JSON.stringify(lista));

            $("#tarefa").val("");

            $("#msgExcluido").css({"display":"none"});
            $("#msgFeita").css({"display":"none"});
            $("#msgRepetida").css({"display":"none"});
            $("#msgAdicionado").css({"display":"block"});
            
            setTimeout(() => {
                
                $("#msgAdicionado").css({"display":"none"});

            }, 3000);

            imprimeLista();

            if (lista.length > 3) {
               
                $('.principal').css({
                    'height' : $('.principal').height() + 100 + "px"
                });	
    
                localStorage.setItem("alturaPrincipal", JSON.stringify($('.principal').height()));
            }
    
        } else {

            $("#tarefa").val("");

            $("#msgExcluido").css({"display":"none"});
            $("#msgFeita").css({"display":"none"});
            $("#msgAdicionado").css({"display":"none"});
            $("#msgRepetida").css({"display":"block"});
            
            setTimeout(() => {
                
                $("#msgRepetida").css({"display":"none"});

            }, 3000);

        }

        event.preventDefault();
    })

    $("#btLimparLista").click(()=>{
        localStorage.removeItem("lista");
        localStorage.removeItem("alturaPrincipal");
        location.reload();
    })
})

function tarefaFeita(index) {

    if (localStorage.getItem("lista") != null) {
        lista = JSON.parse(localStorage.getItem("lista"));
    }

    lista[index].feito = true;

    localStorage.setItem("lista", JSON.stringify(lista));

    $("#msgExcluido").css({"display":"none"});
    $("#msgAdicionado").css({"display":"none"});
    $("#msgRepetida").css({"display":"none"});
 
    imprimeLista();
}

function tarefaExcluida(index) {

    if (localStorage.getItem("lista") != null) {
        lista = JSON.parse(localStorage.getItem("lista"));
    }

    lista.splice(index,1);

    localStorage.setItem("lista", JSON.stringify(lista));

    $("#msgAdicionado").css({"display":"none"});
    $("#msgFeita").css({"display":"none"});
    $("#msgRepetida").css({"display":"none"});
    $("#msgExcluido").css({"display":"block"});
    
    setTimeout(() => {
        
        $("#msgExcluido").css({"display":"none"});

    }, 3000);

    imprimeLista();

    if (lista.length == 3 || lista.length > 3) {
        $('.principal').css({
            'height' : $('.principal').height() - 100 + "px"
        });	    
        localStorage.setItem("alturaPrincipal", JSON.stringify($('.principal').height()));
    }
}

function imprimeLista() {

    if (localStorage.getItem("lista") != null) {
        lista = JSON.parse(localStorage.getItem("lista"));
    }

    let texto = "";

    for(i = 0; i < lista.length; i++){

        texto += 
            `<form class="d-flex justify-content-between ${lista[i].feito ? "item-feito" : "item"} mb-3">
                <label class="form-label tarefa">${lista[i].nome}</label>
                <div>
                    <button class="${lista[i].feito ? "btTarefaFeita" : ""} btn btn-success" onclick="tarefaFeita(${i})" type="submit">
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <button class="btn btn-danger" onclick="tarefaExcluida(${i})" type="submit">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </form>`;

    }

    if (texto == "") {
        $("#lista").html(
                        `<div class="alert alert-danger" role="alert">
                            Não existem tarefas até o momento
                          </div>`
                        );
        $("#btLimparLista").css({"display":"none"});
    } else {
        $("#lista").html(texto);

        if (lista.length > 3) {

            $('.principal').css({
                'height' : JSON.parse(localStorage.getItem("alturaPrincipal"))
            });	
        }

        $("#btLimparLista").css({"display":"block"});
    }
}