app.controller('receitasHistoricoRevisao', ['$scope', '$route', '$http', function ($scope, $route, $http) {

    $scope.$on('$viewContentLoaded', function () {

        $('#Cadastros').addClass('show');

    });

    $("#btnCancelar").click(function () {
        $("#btnUsuario").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputUser").val("");
        $("#inputNome").val("");
        $("#inputQtd").val("");
        $("#inputSenha").val("");
    });

    $("#btnPesquisar").click(function () {
        if ($("#btnPesquisar").hasClass("btn-success")) {

            //CARREGA DATA TABLE:
            if ($.fn.dataTable.isDataTable('#datatable_receitas_overview')) {
                $('#datatable_receitas_overview').DataTable().clear();
                $('#datatable_receitas_overview').DataTable().destroy();
            }

            $("#Card_tabela").css("display", "block");

            var MaterialSelected;
            var idSap_Mat_Code;
            var idC_Espec;

            var IdSelected = $('#inputId').val();
            var StatusSelected = $('#inputStatusReceita option:selected').val();
            var material = $('#selectMaterial option:selected').val();

            if (material != "") {
                MaterialSelected = material.replace(" ", "");
            } else {
                MaterialSelected = material
            }

            //trata os campos de id da receita - pode receber C_ESPEC e MAT_SAP_CODE
            if (IdSelected != "") { //se id receber algum valor
                var id_dividido = IdSelected.split("-");

                if (id_dividido.length >= 1) { //se contem hífem divide os codigos C_ESPEC e MAT_SAP_CODE
                    idSap_Mat_Code = id_dividido[1].replace(" ", "");
                    idC_Espec = id_dividido[0].replace(" ", "");

                } else {
                    idC_Espec = id_dividido;
                }

            } else { //se id não receber nenhum valor
                idSap_Mat_Code = "";
                idC_Espec = "";
            }

            $scope.tableVersao = $('#datatable_receitas_overview').DataTable({
                "select": true,
                "language": {
                    "decimal": "",
                    "emptyTable": "Nenhum resultado encontrado",
                    "info": "Mostrando _START_ à _END_ de _TOTAL_ resultados",
                    "infoEmpty": "Mostrando 0 à 0 de 0 resultados",
                    "infoFiltered": "(filtrado de _MAX_ total resultados)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ resultados",
                    "loadingRecords": "Carregando...",
                    "processing": "Processando...",
                    "search": "Procurar entrada:",
                    "zeroRecords": "Nenhum resultado encontrado com a busca",
                    "paginate": {
                        "first": "Primeira",
                        "last": "Última",
                        "next": "Próxima",
                        "previous": "Anterior"
                    },
                    "aria": {
                        "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                        "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                    }
                },
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
                    "<'row'<'col-sm-12 'B>>",
                buttons: [{
                        extend: 'excelHtml5',
                        title: 'Receitas - Histórico de Revisão - ' + moment().format("DD.MM.YY"),
                        text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
                        className: 'btn-export',
                        // exportOptions: {
                        //     columns: [0, 1, 2]
                        // }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: 'Receitas - Histórico de Revisão - ' + moment().format("DD.MM.YY"),
                        text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
                        className: 'btn-export',
                        // exportOptions: {
                        //     columns: [0, 1, 2]
                        // }
                    },
                ],
                responsive: true,
                autoFill: {
                    enable: false
                },
                columns: [{
                        "data": 'iD_RECEITA',
                        "render": function (d, t, data) {
                            return data.c_ESPEC + " - " + data.maT_SAP_CODE
                        }
                    },
                    {
                        data: 'material.maT_DESC'
                    },
                    {
                        data: 'mT_CODE'
                    },
                    {
                        data: 'versao'
                    },
                    {
                        "data": 'dT_IMPORT',
                        "render": function (d, t, data) {
                            return moment(data.dT_IMPORT).format('DD/MM/YYYY');
                        }
                    },
                    {
                        "data": 'ativo',
                        "render": function (d, t, data) {
                            console.log(data.ativo);
                            if (data.ativo == true) { //ativo
                                //return "Ativa"
                                return "<span style='color:green; font-weight: bold;'>Ativa</span>"
                            } else {
                                return "Inativa"
                            }
                        }
                    },

                ],

            });
            $scope.getTableVersao();
        };
    });

    $scope.getTableVersao = () => {
        $http.get(Url.receita.overview + `HistoricoVersao?idSapMatCode=${idSap_Mat_Code}&status=${StatusSelected}&material=${MaterialSelected}&idCEspec=${idC_Espec}`).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };
}]);