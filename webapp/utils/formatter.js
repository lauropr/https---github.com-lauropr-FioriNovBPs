sap.ui.define([], () => {
	"use strict";

	return {
        formataDescricao: function(sCategoria, sPrimeiroNome, sSegundoNome, sOrgNome1, sOrgNome2){
            // Para categoria 1 (pessoa), retornar o primeiro e segundo nomes
            // para categoria 2 (empresa), retornar o nome1 e nome2 da companhia
            var sRetorno;
            switch(sCategoria){
                case "1":
                    sRetorno = sPrimeiroNome + " " + sSegundoNome;
                    break;
                case "2":
                    sRetorno = sOrgNome1 + " " + sOrgNome2;                    
                    break;
            }
            return sRetorno;
        }
	};
});