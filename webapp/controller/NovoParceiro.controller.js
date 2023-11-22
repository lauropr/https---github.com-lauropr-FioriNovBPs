sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(BaseController, MessageToast) {
      "use strict";
  
      return BaseController.extend("fiorinov.bp.controller.NovoParceiro", {
        onInit() {
        },

        onBeforeRendering: function(){

          //criação ou exibição do fragmento (exibição se já foi criado)
          this.loadFragment({
            name: "fiorinov.bp.view.fragment.criarParceiro"
          }).then((oFragment) => { //declaração de função que roda na seção then (quando a promise resolve com sucesso)
            //acessar nossa view
            var oPagina = this.getView().byId("paginaNovoParceiro");
            //adicionar o fragmento como conteúdo da view
            oPagina.addContent(oFragment);

            //resgatar o modelo NovoParceiro
            var oModel = this.getOwnerComponent().getModel("novoParceiro");
            //associar o modelo na Pagina
            oPagina.setModel(oModel, "novoParceiro");
            
          }).catch(() => {  //declaração de função que roda na seção catch (quando a promise tem um problema, exceção, etc)
          })


        },

        aoCancelar: function(oEvent){
          //resgata o modelo
          var oModel = this.getOwnerComponent().getModel("novoParceiro");
          //limpa o modelo (passando a raiz dos dados com / e um objeto vazio com {})
          oModel.setProperty("/", {});

          //resgata o roteador
          var oRoteador = this.getOwnerComponent().getRouter();
          //executar a navegação
          oRoteador.navTo("RouteParceiros");
        },

        aoCriar: function(oEvent){
            //objeto com o layout da entidade Parceiros
            var oDadosOData = {};

            //resgatar o modelo com os dados populados
            var oDados = this.getOwnerComponent().getModel("novoParceiro").getProperty("/");

            //popula o objeto do serviço com os dados do modelo
            oDadosOData.PartnerType = oDados.categoria;
            oDadosOData.PartnerName1 = oDados.nome1;
            oDadosOData.PartnerName2 = oDados.nome2;
            oDadosOData.SearchTerm1 = oDados.termoPesquisa1;
            oDadosOData.SearchTerm2 = oDados.termoPesquisa2;
            oDadosOData.Street = oDados.rua;
            oDadosOData.HouseNumber = oDados.numero;
            oDadosOData.District = oDados.bairro;
            oDadosOData.City = oDados.cidade;
            oDadosOData.Region = oDados.estado;
            oDadosOData.ZipCode = oDados.cep;
            oDadosOData.Country = oDados.pais;



            //resgatar o modelo principal (OData)
          var oModel = this.getView().getModel();

          //fazer a chamada OData Create
            oModel.create("/Parceiros", oDadosOData, {
              success: oResult => {
                MessageToast.show("Parceiro " + oResult.PartnerId + " com sucesso!" );
                //resgata o roteador
                var oRoteador = this.getOwnerComponent().getRouter();
                //executar a navegação
                oRoteador.navTo("RouteParceiros");
              },
              error: oError => {
                var oErro = JSON.parse(oError.responseText);
                MessageToast.show(oErro.error.message.value);
              }
          });        
        },
        
        aoEscolherCategoria: function(oEvent){
          //resgata o id escolhido através do binding de contexto com o modelo novoParceiro
          var sId = oEvent.getParameter('selectedItem').getBindingContext('novoParceiro').getObject().id;

          //resgata o modelo novoParceiro
          var oModel = this.getOwnerComponent().getModel("novoParceiro");
          //configura a propriedade categoria com o ID escolhido
          oModel.setProperty("/categoria", sId);

        }

      });
    }
  );
  