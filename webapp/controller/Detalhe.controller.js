sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../utils/formatter",
    // sobe um nível para a pasta webapp, acessa o arquivo formatter

    //importa as classes de filtro
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter, Filter, FilterOperator, MessageToast) {
        "use strict";        
        return Controller.extend("fiorinov.bp.controller.Detalhe", {
            formatter: Formatter,
            
            onInit: function () {

                //configura uma função que é executada no momento em que a navegação p/ RotaDetalhe é feita
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RotaDetalhe").attachPatternMatched(this.rotaDetalhe, this);
                
            },

            rotaDetalhe: function(oEvent){
                var sParceiro = oEvent.getParameter('arguments').parceiro;

                var oModel = this.getView().getModel();
                //monta o caminho da chamada OData com a entidade desejada e o valor resgatado da URL
                var sCaminho = oModel.createKey("/Parceiros", {
                    PartnerId: sParceiro
                });

                //Modo 1 
                var oView = this.getView();
                oView.bindElement({
                    path: sCaminho
                });

                //Modo2 
                // oModel.read(sCaminho, {
                //     success: oResult => {  //função anonima 
                //         var oModel = new JSONModel();
                //         oModel.setProperty("/", oResult);
                //         this.getView().setModel(oModel, "modeloDetalhe");

                //     }, 
                //     error: oError => { //função anonima
                //         debugger;
                //     }
                // });
            },

            aoEditar: function(oEvent){
                //resgatar o modelo modo
                var oModel = this.getView().getModel("modo");
                //alterar a propriedade editavel para true
                oModel.setProperty("/editavel", true);

                //resgatar o modelo edicao
                oModel = this.getView().getModel("edicao");
                //alterar a propriedade visivel para true
                oModel.setProperty("/visivel", true);

                //resgatar o modelo exibicao
                oModel = this.getView().getModel("exibicao");
                //alterar a propriedade visivel para true
                oModel.setProperty("/visivel", false);

            },

            aoCancelar: function(oEvent){
                //resgatar o modelo modo
                var oModel = this.getView().getModel("modo");
                //alterar a propriedade editavel para true
                oModel.setProperty("/editavel", false);

                //resgatar o modelo edicao
                oModel = this.getView().getModel("edicao");
                //alterar a propriedade visivel para true
                oModel.setProperty("/visivel", false);

                //resgatar o modelo exibicao
                oModel = this.getView().getModel("exibicao");
                //alterar a propriedade visivel para true
                oModel.setProperty("/visivel", true);

                //as alterações feitas são revertidas pro estado anterior
                var oModeloPrincipal = this.getView().getModel();
                oModeloPrincipal.resetChanges();
                
            },

            aoSalvar: function(oEvent){
                //resgata a view
                var oView = this.getView();

                //resgata o contexto de binding da view e depois acessa o caminho que vai ser chamado 
                var sCaminho = oView.getBindingContext().getPath();

                //resgata os dados pro update
                var oDados = oView.getBindingContext().getObject();

                //resgata o modelo OData
                var oModel = this.getView().getModel();


                //configura infos técnicas para que o SAP possibilite edição
                oModel.sDefaultUpdateMethod = "PUT";
                oModel.setHeaders({ 'X-Requested-With': 'X'});

                //submete a chamada (caminho, dados e um objeto com uma função success e outra função error)
                oModel.update(sCaminho, oDados, {
                    success: oResult => {
                        MessageToast.show("Dados atualizados com sucesso!")
                    }, 
                    error: oError => {
                        var oErro = JSON.parse(oError.responseText);
                        MessageToast.show(oErro.error.message.value);
                    }
                });

                //....


            }
        });
    });
