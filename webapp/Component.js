/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "fiorinov/bp/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("fiorinov.bp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                this.getRouter().attachBeforeRouteMatched(this.aoNavegar, this);

                // cria um novo modelo de layout, passa o valor OneColumn para a propriedade /layout
                // e associar ele ao Component pra ficar disponível globalmente
                var oModel = new JSONModel();
                oModel.setProperty("/modoDeExibicao", "OneColumn");
                //associa ele com o nome "layout"
                this.setModel(oModel, "layout");

                //cria o modelo que controla o modo dos dados (visualização ou edição) a partir de uma propriedade booleana
                var oModel = new JSONModel();
                oModel.setProperty("/editavel", false);
                //associa ele com o nome "layout"
                this.setModel(oModel, "modo");

                //cria o modelo que controla o modo dos dados (visualização ou edição) a partir de uma propriedade booleana
                var oModel = new JSONModel();
                oModel.setProperty("/visivel", false);
                //associa ele com o nome "layout"
                this.setModel(oModel, "edicao");

                //cria o modelo que controla o modo dos dados (visualização ou edição) a partir de uma propriedade booleana
                var oModel = new JSONModel();
                oModel.setProperty("/visivel", true);
                //associa ele com o nome "layout"
                this.setModel(oModel, "exibicao");



                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this.getModel().setDefaultBindingMode("TwoWay");
            },

            aoNavegar: function(oEvent){
                var sNomeDaRota = oEvent.getParameter('name');
                var sLayout;

                switch(sNomeDaRota){
                    case "RotaDetalhe":
                        sLayout = "TwoColumnsMidExpanded";
                        break;
                    case "RouteParceiros":
                        sLayout = "OneColumn";
                        break;
                }
                
                //resgata o modelo "layout" e sobrescreve a propriedade de exibição pro valor setado anteriormente
                var oModel = this.getModel("layout");
                oModel.setProperty("/modoDeExibicao", sLayout);


            }


        });
    }
);