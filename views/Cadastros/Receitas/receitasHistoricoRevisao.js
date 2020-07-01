app.controller('receitasHistoricoRevisao', ['$scope', '$route', '$http', function ($scope, $route, $http) {

    $scope.$on('$viewContentLoaded', function () {

        $('#Cadastros').addClass('show');
        getMaterial();

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

            //$scope.getTableVersao();

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

            $scope.getTableVersao(idSap_Mat_Code, StatusSelected, MaterialSelected, idC_Espec);

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
                    data: 'iD_RECEITA'
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
                    data: 'dT_IMPORT',
                },
                {
                    data: 'ativo'
                },
                {
                    data: 'ativo'
                },
                ],
                "columnDefs": [{

                    "targets": 0,
                    "data": 'iD_RECEITA',
                    render: function (d, t, data) {
                        return data.c_ESPEC + "-" + data.maT_SAP_CODE 
                    }
                },
                {
                    "targets": 1,
                    "data": 'material.maT_DESC',
                    render: function (d, t, data) {
                        return data.material.maT_DESC 
                    }
                },
                {
                    "targets": 4,
                    "data": 'dT_IMPORT',
                    render: function (d, t, data) {
                        return moment(data.dT_IMPORT).format('DD/MM/YYYY');
                    }
                },
                {
                    "targets": 5,
                    render: function (d, t, data) {
                        console.log(data.ativo);
                        if (data.ativo == true) { //ativo
                            //return "Ativa"
                            return "<span style='color:green; font-weight: bold;'>Ativa</span>"
                        } else {
                            return "Inativa"
                        }
                    }
                },
                {
                    "targets": 6,
                    render: function (d, t, data) {
                        console.log(data.ativo);                        
                            return "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='.bd-example-modal-xl'>Detalhes</button>"
                    }
                }
                ],

            });

        };
    });

    $('#datatable_receitas_overview tbody').on('click', 'tr', function () {
       
        var data = $scope.tableVersao.row(this).data();

        //CARREGA RECEITA
            $scope.getTableReceita(data.iD_RECEITA);

            //CARREGA DATA TABLE DE RECEITAS:
            if ($.fn.dataTable.isDataTable('#datatable_receita')) {
                $('#datatable_receita').DataTable().clear();
                $('#datatable_receita').DataTable().destroy();
            }

            $scope.tableReceita = $('#datatable_receita').DataTable({
                //"select": true,
                "searching": false,
                "paging": false,
                "info": false,
                "language": {
                    "decimal": "",
                    "emptyTable": "Nenhum resultado encontrado",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "Carregando...",
                    "processing": "Processando...",
                    "zeroRecords": "Nenhum resultado encontrado com a busca",                
                    "aria": {
                        "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                        "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                    }
                },
                responsive: true,
                autoFill: {
                    enable: false
                },
                columns: [
                    {
                        data: 'iD_RECEITA'
                    },
                    {
                        data: 'material.maT_DESC'
                    },
                    {
                        data: 'mT_CODE'
                    },
                    {
                        data: 'dT_IMPORT'
                    },
                    {
                        data: 'versao',
                    },
                    {
                        data: 'ativo'
                    },

                    ],
                "columnDefs": [
                    {
                        "targets": 0,
                        "data": 'iD_RECEITA',
                        render: function (d, t, data) {
                            return data.c_ESPEC + "-" + data.maT_SAP_CODE 
                        }
                    },
                    {
                        "targets": 1,
                        "data": 'material.maT_DESC',
                        render: function (d, t, data) {
                            return data.material.maT_DESC 
                        }
                    },
                    {
                        "targets": 3,
                        "data": 'dT_IMPORT',
                        render: function (d, t, data) {
                            return moment(data.dT_IMPORT).format('DD/MM/YYYY');
                        }
                    },
                    {
                        "targets": 5,
                        render: function (d, t, data) {
                            console.log(data.ativo);
                            if (data.ativo == true) { //ativo
                                //return "Ativa"
                                return "<span style='color:green; font-weight: bold;'>Ativa</span>"
                            } else {
                                return "Inativa"
                            }
                        }
                    }
                ],
            });

        //CARREGA MPS:
            $scope.getTableMP(data.iD_RECEITA);

            //CARREGA DATA TABLE DE MATERIAS PRIMAS:
            if ($.fn.dataTable.isDataTable('#datatable_mp')) {
                $('#datatable_mp').DataTable().clear();
                $('#datatable_mp').DataTable().destroy();
            }

            $scope.tableMP = $('#datatable_mp').DataTable({
                //"select": true,
                "searching": false,
                "paging": false,
                "info": false,
                "language": {
                    "decimal": "",
                    "emptyTable": "Nenhum resultado encontrado",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "Carregando...",
                    "processing": "Processando...",
                    "zeroRecords": "Nenhum resultado encontrado com a busca",                
                    "aria": {
                        "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                        "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                    }
                },
                responsive: true,
                autoFill: {
                    enable: false
                },
                columns: [
                    {
                        data: 'chilD_MAT_SAP_CODE'
                    },
                    {
                        data: 'boM_QUANTITY'
                    },
                    {
                        data: 'mppaR_TOLMAX'
                    },
                    {
                        data: 'mppaR_TOLMIN'
                    },
                    {
                        data: 'mppaR_VELRAP'
                    },
                    {
                        data: 'mppaR_VELLEN'
                    },
                    {
                        data: 'mppaR_VELJOG'
                    },
                    {
                        data: 'mppaR_PESOLEN'
                    },
                    {
                        data: 'mppaR_PESOJOG'
                    },
                    {
                        data: 'mppaR_TEMPOJOG'
                    },
                    {
                        data: 'mppaR_SILOTANQUE'
                    }
                    ]
            });

        //CARREGA OPERAÇÕES
            $scope.getTableOperacao(data.iD_RECEITA);

            //CARREGA DATA TABLE DE OPERAÇÕES:
            if ($.fn.dataTable.isDataTable('#datatable_op')) {
                $('#datatable_op').DataTable().clear();
                $('#datatable_op').DataTable().destroy();
            }

            $scope.tableOperacao = $('#datatable_op').DataTable({
                //"select": true,
                "searching": false,
                "paging": false,
                "info": false,
                "language": {
                    "decimal": "",
                    "emptyTable": "Nenhum resultado encontrado",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "Carregando...",
                    "processing": "Processando...",
                    "zeroRecords": "Nenhum resultado encontrado com a busca",                
                    "aria": {
                        "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                        "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                    }
                },
                responsive: true,
                autoFill: {
                    enable: false
                },
                columns: [{
                        data: 'opeR_SEQ'
                    },
                    {
                        data:  'opeR_DESC'
                    },
                    {
                        data: 'rproC_TEMPO'
                    },
                    {
                        data: 'rproC_ENERGIA'
                    },
                    {
                        data: 'rproC_RPM'
                    },
                    {
                        data: 'rproC_TEMPERATURA'
                    },
                    {
                        data: 'rproC_PRESSAOPISTAO'
                    }
                ]
            });

         //CARREGA PROCESSO         
            $scope.getTableProcesso(data.iD_RECEITA);

            //CARREGA DATA TABLE DE PROCESSO:
            if ($.fn.dataTable.isDataTable('#datatable_Processo')) {
                $('#datatable_Processo').DataTable().clear();
                $('#datatable_Processo').DataTable().destroy();
            }

            $scope.tableProcesso = $('#datatable_Processo').DataTable({
                //"select": true,
                "searching": false,
                "paging": false,
                "info": false,
                "language": {
                    "decimal": "",
                    "emptyTable": "Nenhum resultado encontrado",
                    "infoPostFix": "",
                    "thousands": ",",
                    "loadingRecords": "Carregando...",
                    "processing": "Processando...",
                    "zeroRecords": "Nenhum resultado encontrado com a busca",                
                    "aria": {
                        "sortAscending": ": Ative para ordenar a coluna em ordem crescente",
                        "sortDescending": ": Ative para ordenar a coluna em ordem decrescente"
                    }
                },
                responsive: true,
                autoFill: {
                    enable: false
                },
                columns: [{
                        data: 'rproC_TEMPMIXER1'
                    },
                    {
                        data:  'rproC_TEMPMIXER2'
                    },
                    {
                        data: 'rproC_TEMPMIXER3'
                    },
                    {
                        data: 'rproC_TEMPSEGURANCA'
                    },
                    {
                        data: 'rproC_PRESSAOSONDA'
                    },
                    {
                        data: 'rproC_VELOCROTOR'
                    },
                    {
                        data: 'rproC_NOTAS'
                    }
                ]
            });

    });


    $scope.getTableVersao = (idSap_Mat_Code, StatusSelected, MaterialSelected, idC_Espec) => {
        $http.get(Url.receita.overview.def + `HistoricoVersao?idSapMatCode=${idSap_Mat_Code}&status=${StatusSelected}&material=${MaterialSelected}&idCEspec=${idC_Espec}`).then(function successCallback(response) {
            $scope.tableVersao.clear().draw();
            $scope.tableVersao.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };
//novidade
    $scope.getTableReceita = (idReceita) => {
        $http.get(Url.receita.overview.def + `${idReceita}`).then(function successCallback(response) {
            $scope.tableReceita.clear().draw();
            $scope.tableReceita.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getTableMP = (idReceita) => {
        $http.get(Url.receita.overview.mp + `${idReceita}`).then(function successCallback(response) {
            $scope.tableMP.clear().draw();
            $scope.tableMP.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getTableOperacao = (idReceita) => {
        $http.get(Url.receita.overview.operacao + `${idReceita}`).then(function successCallback(response) {
            $scope.tableOperacao.clear().draw();
            $scope.tableOperacao.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getTableProcesso = (idReceita) => {
        $http.get(Url.receita.overview.processo + `${idReceita}`).then(function successCallback(response) {
            $scope.tableProcesso.clear().draw();
            $scope.tableProcesso.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

}]);