sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../utils/formatter",
    // sobe um nível para a pasta webapp, acessa o arquivo formatter

    //importa as classes de filtro
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter, Filter, FilterOperator) {
        "use strict";        
        return Controller.extend("fiorinov.bp.controller.Parceiros", {
            formatter: Formatter,
            
            onInit: function () {
            },

            aoPesquisarParceiro: function(oEvent){
                //resgata o valor do campo de pesquisa
                var sPesquisa = oEvent.getParameter('newValue');

                //resgata a tabela da view
                var oTabelaParceiros = this.getView().byId('parceiros');
                var oBinding = oTabelaParceiros.getBinding("items");

                var aFiltros = [];

                //novo objeto de filtro com todos os critérios
                var oFiltro = new Filter({
                    filters: [
                        // cada linha desse array é um objeto Filter com um critério de pesquisa 
                         new Filter("BusinessPartner", FilterOperator.Contains, sPesquisa) ,
                         new Filter("FirstName", FilterOperator.Contains, sPesquisa) ,
                         new Filter("OrganizationBPName1", FilterOperator.Contains, sPesquisa) ,
                    ],
                    //indica que vai ser um OR em vez de AND
                    and: false
                });

                aFiltros.push(oFiltro);
                
                oBinding.filter(aFiltros);
            },

            aoPressionarItem: function(oEvent){
                //resgata o item clicado
                var oItem = oEvent.getParameter('listItem');

                //acessa o contexto de vínculo do item clicado com o modelo (modelo OData)
                //getBinding() não tem nenhum argumento pois nosso modelo é o principal, sem nome 
                var oItemClicadoNoModelo = oItem.getBindingContext().getObject();
                var sParceiro = oItemClicadoNoModelo.BusinessPartner;

                //resgata o roteador
                var oRoteador = this.getOwnerComponent().getRouter();

                //navegar para a página de detalhe do parceiro
                oRoteador.navTo("RotaDetalhe", {
                    parceiro: sParceiro
                });

            },
            
            aoCriarParceiro: function(oEvent){
                //resgata o Roteador do Component.js
                var oRoteador = this.getOwnerComponent().getRouter();

                //efetuar a chamada da rota Novo parceiro
                oRoteador.navTo("RotaNovoParceiro");
            }
            


        });
    });
