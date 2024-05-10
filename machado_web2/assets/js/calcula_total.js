//Captura todas as encomendas
var clientes = document.querySelectorAll(".cliente");

for (var count=0; count < clientes.length; count++){
    
    //Captura a quantidade encomendada
    var quant = clientes[count].querySelector(".quant").textContent;

    //Captura o valor unitario da encomenda
    var unitario = clientes[count].querySelector(".valor").textContent;

    //Verifica se a quantidade é valida
    if (!validaQuant(quant)){
        //Quantidade NOK, avisa usuário
        clientes[count].querySelector(".quant").textContent = "QUANTIDADE INVALIDA!";
        clientes[count].querySelector(".quant").classList.add("quant-invalida");
        clientes[count].querySelector(".valor").textContent = format(parseFloat(unitario));
    }
    else if(!validaUni(unitario)){
        //Valor Unitario NOK, avisa usuário
        clientes[count].querySelector(".valor").textContent = "VALOR INVALIDO!";
        clientes[count].classList.add("unit-invalida");
    } 
    else{
        //Quantidade OK, prosseguir
        //Captura o valor da encomenda
        clientes[count].querySelector(".total").textContent = calculaTotal(quant, unitario);
        clientes[count].querySelector(".valor").textContent = format(parseFloat(unitario));
    }
    
    
}

//Função para o calculo do valor total
function calculaTotal(quantEncomenda, unitarioProduto){
    var total = 0;

    total = quantEncomenda * unitarioProduto;

    return format(total);
}

function validaQuant(quant){
    if(quant > 0 && !isNaN(quant)){
        return true;
    }else{
        return false;
    }
}

function validaUni(unit){
    if(unit > 0 && !isNaN(unit)){
        return true;
    }else{
        return false;
    }
}

function format(val){
    var valor = val.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

    return valor;
}