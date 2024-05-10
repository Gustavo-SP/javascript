var botaoAdicionar = document.querySelector("#bot");

botaoAdicionar.addEventListener("click", function(event){

    event.preventDefault();

    //Captura o formulário da página
    var form = document.querySelector("#form-adiciona");

    //Captura os dados da nova encomenda
    var encomenda = obtemEncomenda(form);

    //Valida os dados do formulario
    var validacao = validaEncomenda(encomenda);

    //Valida se a encomenda pode ser inserida
    if(validacao.length > 0) {
        //Há erros de preenchimento, informa para o usario
        exibeMensagensErro(validacao);
        return;
    } else {
        //Encomenda OK, insere na tabela
        //Insere a nova encomenda na tabela
        addEncomenda(encomenda);

        //Limpa o formulário
        form.reset();

        //Limpa a lista de erros
        document.querySelector("#mensagens-erro").innerHTML = "";
    }
  
});

//Função para capturar os dados da nova encomenda
function obtemEncomenda(dadosForm){

    var encomenda = {
        nome: dadosForm.nome.value,
        qtde: dadosForm.quantidade.value,
        produto: dadosForm.produto.value,
        unitario: dadosForm.val_unit.value,
    }

    return encomenda;
}

//Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda){

    var tabela = document.querySelector("#tabela");

    tabela.appendChild(montaTR(novaEncomenda));
}

//Monta uma coluna nova
function montaTD(dado) {

    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}

//Monta uma nova TR
function montaTR(novaEncomenda){

    var tr = document.createElement("tr");

    tr.appendChild(montaTD(novaEncomenda.nome));
    tr.appendChild(montaTD(novaEncomenda.produto));
    tr.appendChild(montaTD(novaEncomenda.qtde));
    tr.appendChild(montaTD(format(parseFloat(novaEncomenda.unitario))));
    tr.appendChild(montaTD(calculaTotal(novaEncomenda.qtde, novaEncomenda.unitario)));

    return tr;
}

//Função para validação da quantidade e do unitário
function validaEncomenda(encomenda){

    var erros =[];

    //Verifica se o nome foi informado
    if(encomenda.nome=="") {
        erros.push("O nome não pode ser vazio!");
    }

    //Valida de o produto foi informado
    if(encomenda.produto==0){
        erros.push("Por favor, selecione um produto para a solicitação.");
    }

    //Verifica se a quantidade é maior que zero e um número
    if(encomenda.qtde <= 0 || isNaN(encomenda.qtde)){
        erros.push("A quantidade deve ser numérica e maior que 0.");
    }

    //Verifica se o valor unitário é maior que zero e um número
    if(encomenda.unitario <=0 || isNaN(encomenda.unitario)){
        erros.push("O valor unitário deve ser numérico e maior que 0.");
    }

    return erros;
}

//Função para exibir os erros de preenchimento do formulario
function exibeMensagensErro(msgs){
    var ul = document.querySelector("#mensagens-erro");

    //Limpa a UL
    ul.innerHTML = "";

    msgs.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}