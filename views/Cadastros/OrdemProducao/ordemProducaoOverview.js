app.controller('ordemProducaoOverview', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idOP = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.carregaOpsPendentes();

        $("#btnCancelar").click(function () {
            $("#btnPesquisar").removeClass("btn-warning").addClass("btn-success").text("Pesquisar");
            $("#btnExcluir").css("display", "none");

            $("#inputOP").val("");
            $("#inputCentro").val("");
            $("#inputReceita").val("");
            $("#inputQtd").val("");
            $("#inputDtPrevista").val("");
            $("#inputStatus").val("");
            $("#inputDtCriacao").val("");

        });

        $("#btnPesquisar").click(function () {

            if ($("#btnPesquisar").hasClass("btn-success")) {

                var idOP = $("#inputOP").val();
                var dtPrevistaInicio = $("#inputDtPrevistaInicio").val(); // moment(new Date($("#inputDtPrevistaInicio").val())).format("YYYY-DD-MMT00:00:00");
                var dtPrevistaFim = $("#inputDtPrevistaFim").val();
                var statusOP = $("#inputStatus").val();

                if (idOP == '') {
                    idOP = 0
                }
                if (statusOP == '') {
                    statusOP = 0
                }

                /* var data = {
                     //id: idOP,
                     status: statusOP,
                     dtPrevistaInicio: dtPrevistaInicio,
                     dtPrevistaFim: dtPrevistaFim,
                 };          */
                $http({
                    url: Url.ordemProducao.overview + `/${idOP}?status=${statusOP}&dtPrevistaInicio=${dtPrevistaInicio}&dtPrevistaFim=${dtPrevistaFim}`,
                    //url: Url.ordemProducao.overview+`/${idOP}`,
                    method: 'GET',
                    //data: JSON.stringify(data),                       
                    processData: false
                }).then(function successCallback() {
                    $('#datatable_ordemProducaoOverview').DataTable().clear();
                    $('#datatable_ordemProducaoOverview').DataTable().destroy();
                    $scope.table = '';


                    $("#btnCancelar").click();

                    if (!data) {
                        alert('Registros não encontrados. Por favor refaça a consulta.');
                    } else {

                        $scope.table = $('#datatable_ordemProducaoOverview').DataTable({
                            "aaData": data,
                            columns: [{
                                    data: 'orD_ID'
                                },
                                {
                                    "data": 'iD_RECEITA',
                                    "render": function (d, t, data) {
                                        if (data.material == null) {
                                            return data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE
                                        } else {
                                            return data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE + " - " + data.material.maT_DESC
                                        }

                                    }
                                },
                                {
                                    data: 'orD_QUANTITY'
                                },
                                {
                                    "data": "orD_DATE_CREATION",
                                    "render": function (d, t, data) {
                                        return moment(data.orD_DATE_CREATION).format('DD/MM/YYYY HH:mm');
                                    }
                                },
                                {
                                    "data": 'orD_DATE_PLANNED',
                                    "render": function (d, t, data) {
                                        return moment(data.orD_DATE_PLANNED).format('DD/MM/YYYY');
                                    }
                                },
                                {
                                    "data": 'stA_NOME',
                                    "render": function (d, t, data) {
                                        if (data.ordemStatus.stA_NOME == 'Criada') { //criada
                                            return "<span style='color:orange;'>" + data.ordemStatus.stA_NOME + "</span>"
                                        } else if (data.ordemStatus.stA_NOME == 'Em Espera') { //em Espera
                                            return "<span style='color:grey;'>" + data.ordemStatus.stA_NOME + "</span>"
                                        } else if (data.ordemStatus.stA_NOME == 'Em Produção') { //Em produção
                                            return "<span style='color:blue;'>" + data.ordemStatus.stA_NOME + "</span>" // <i class='fa fa-spinner fa-2x' style='color:blue;' aria-hidden='true'></i>"
                                        } else if (data.ordemStatus.stA_NOME == 'Finalizada') { //Finalizada
                                            return "<span style='color:green;'>" + data.ordemStatus.stA_NOME + "</span>" // <i class='fa fa-check-circle fa-2x' style='color:green;' aria-hidden='true'></i>"
                                        } else if (data.ordemStatus.stA_NOME == 'Cancelada') { //Cancelada
                                            return "<span style='color:gray;'>" + data.ordemStatus.stA_NOME + "</span>"
                                        } else {
                                            return "<span style='color:black;'>" + data.ordemStatus.stA_NOME + "</span>"
                                        }
                                    }
                                },
                                {
                                    "data": 'orD_ID',
                                    "render": function (d, t, data) {
                                        if (data.ordemStatus.stA_NOME == 'Criada') { //criada
                                            //return "<button id='"+data.orD_ID+"' onclick='acionarOP(this)' name='Produzir' class='btn btn-info btn-sm produzir'>PRODUZIR</button>"
                                            return "<button id='" + data.orD_ID + "'  name='Produzir' class='btn btn-info btn-sm produzir'>PRODUZIR</button>"
                                        } else if (data.ordemStatus.stA_NOME == 'Em Espera') { //em Espera
                                            //return "<button id='"+data.orD_ID+"' onclick='acionarOP(this)' name='Cancelar' class='btn btn-danger btn-sm cancelar'>CANCELAR</button>"
                                            return "<button id='" + data.orD_ID + "'  name='Cancelar' class='btn btn-danger btn-sm cancelar'>CANCELAR</button>"
                                        } else if (data.ordemStatus.stA_NOME == 'Em Produção') { //Em produção
                                            return "<span style='color:gray;'></span>"
                                        } else if (data.ordemStatus.stA_NOME == 'Finalizada') { //Finalizada
                                            return "<span style='color:black;'></span>"
                                        } else if (data.ordemStatus.stA_NOME == 'Cancelada') { //Cancelada
                                            return "<span style='color:gray;'></span>"
                                        } else {
                                            return "<span style='color:black;'></span>"
                                        }
                                    }
                                }

                            ],
                        });
                    }
                }, function errorCallback() {
                    Swal.fire({
                        title: 'Refaça operação',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                });

            } else if ($("#btnPesquisar").hasClass("btn-warning")) {
                Swal.fire({
                    title: `Editar Ordem de Produção?`,
                    text: `Esta operação não poderá ser desfeita!`,
                    type: 'warning',
                    showCancelButton: true,
                    reverseButtons: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {

                        var dtPrevista = moment(new Date($("#inputDtPrevista").val())).format("YYYY-MM-DDT00:00:00");
                        var dtCriacao = moment(new Date($("#inputDtCriacao").val())).format("YYYY-MM-DDTHH:mm:ss");

                        var data = {
                            orD_ID: _idOP,
                            orD_DATE_CREATION: dtCriacao, // $("#inputDtCriacao").val(),
                            orD_QUANTITY: parseInt($("#inputQtd").val()),
                            stA_ID: parseInt($("#inputStatus").val()),
                            orG_ID: parseInt($("#inputCentro").val()),
                            orD_DATE_PLANNED: dtPrevista,
                            boM_ID: parseInt($("#inputReceita").val()),
                            orD_ACTIVE: true
                        };

                        $http({
                            url: Url.ordemProducao.def + `/${_idOP}`,
                            method: 'PUT',
                            data: JSON.stringify(data),
                            processData: false
                        }).then(function successCallback() {
                            Swal.fire({
                                title: 'Ordem de Produção Editada!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                // $route.reload();
                            });
                        }, function errorCallback() {
                            Swal.fire({
                                title: 'Refaça operação',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        });
                    } else {
                        // $("#btnCancelar").click();
                    };
                });
            };
        });

        $(document).on('click', '.produzir', function () {
            var classe = $(this).attr("class");
            var _idOP = $(this).attr("id");
            var _operacao = $(this).attr('name');
            console.log(classe + " e id: " + _idOP);


            console.log("entrou na AcionarOP");
            //var data = table.row($(this).closest('tr')).data();

            //var rowID = $(obj).attr('id');
            //var _operacao = $(obj).attr('name');
            //_idOP = $(obj).closest('tr').find('td:first').html();

            console.log('oi mi ID: ' + _idOP + ' nome da acao: ' + _operacao);
            //_idOP = data.orD_ID;  
            //_operacao = "CANCELAR";   
            //var _operacao = "PRODUZIR";


            Swal.fire({
                title: _operacao + ` Ordem de Produção ` + _idOP + `?`,
                text: `Esta operação não poderá ser desfeita!`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {

                $http({
                    url: Url.ordemProducao.processo + `?idOP=${_idOP}&operacao=${_operacao}`,
                    method: 'POST',
                    processData: false
                }).then(function successCallback(response) {
                    if (!response.data) {

                        Swal.fire({
                            title: 'Registros não encontrados. Por favor refaça a consulta.',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            // table.ajax.reload();
                        });

                    } else {

                        if (response.data[0].tipO_RETORNO == 'S') {
                            Swal.fire({
                                title: response.data[0].retorno,
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                //table.ajax.reload();
                                $scope.carregaOpsPendentes();
                                // $("#btnPesquisar").click();
                            });

                        } else {

                            Swal.fire({
                                title: response.data[0].retorno,
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                //table.ajax.reload();
                            });
                        }

                    }
                }, function errorCallback() {
                    Swal.fire({
                        title: 'Refaça operação',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                });
            });
        });
    });

    $scope.carregaOpsPendentes = () => {

        // $('#datatable_ordemProducaoOverview').DataTable().clear();
        // $('#datatable_ordemProducaoOverview').DataTable().destroy();

        $scope.table = $('#datatable_ordemProducaoOverview').DataTable({
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
                    title: 'Ordem de Produção' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Ordem de Produção' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
            ],
            responsive: true,
            columns: [{
                    data: 'orD_ID'
                },
                {
                    "data": 'iD_RECEITA',
                    "render": function (d, t, data) {
                        if (data.material == null) {
                            return data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE
                        } else {
                            return data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE + " - " + data.material.maT_DESC
                        }

                    }
                },
                {
                    data: 'orD_QUANTITY'
                },
                {
                    "data": "orD_DATE_CREATION",
                    "render": function (d, t, data) {
                        return moment(data.orD_DATE_CREATION).format('DD/MM/YYYY HH:mm');
                    }
                },
                {
                    "data": 'orD_DATE_PLANNED',
                    "render": function (d, t, data) {
                        return moment(data.orD_DATE_PLANNED).format('DD/MM/YYYY');
                    }
                },
                {
                    "data": 'stA_NOME',
                    "render": function (d, t, data) {
                        if (data.ordemStatus.stA_NOME == 'Criada') { //criada
                            return "<span style='color:orange;'>" + data.ordemStatus.stA_NOME + "</span>"
                        } else if (data.ordemStatus.stA_NOME == 'Em Espera') { //em Espera
                            return "<span style='color:grey;'>" + data.ordemStatus.stA_NOME + "</span>"
                        } else if (data.ordemStatus.stA_NOME == 'Em Produção') { //Em produção
                            return "<span style='color:blue;'>" + data.ordemStatus.stA_NOME + "</span>" // <i class='fa fa-spinner fa-2x' style='color:blue;' aria-hidden='true'></i>"
                        } else if (data.ordemStatus.stA_NOME == 'Finalizada') { //Finalizada
                            return "<span style='color:green;'>" + data.ordemStatus.stA_NOME + "</span>" // <i class='fa fa-check-circle fa-2x' style='color:green;' aria-hidden='true'></i>"
                        } else if (data.ordemStatus.stA_NOME == 'Cancelada') { //Cancelada
                            return "<span style='color:gray;'>" + data.ordemStatus.stA_NOME + "</span>"
                        } else {
                            return "<span style='color:black;'>" + data.ordemStatus.stA_NOME + "</span>"
                        }
                    }
                },
                {
                    "data": 'orD_ID',
                    "render": function (d, t, data) {
                        if (data.ordemStatus.stA_NOME == 'Criada') { //criada
                            //return "<button id='"+data.orD_ID+"' onclick='acionarOP(this)' name='Produzir' class='btn btn-info btn-sm produzir'>PRODUZIR</button>"
                            return "<button id='" + data.orD_ID + "'  name='Produzir' class='btn btn-info btn-sm produzir'>PRODUZIR</button>"
                        } else if (data.ordemStatus.stA_NOME == 'Em Espera') { //em Espera
                            //return "<button id='"+data.orD_ID+"' onclick='acionarOP(this)' name='Cancelar' class='btn btn-danger btn-sm cancelar'>CANCELAR</button>"
                            return "<button id='" + data.orD_ID + "'  name='Cancelar' class='btn btn-danger btn-sm cancelar'>CANCELAR</button>"
                        } else if (data.ordemStatus.stA_NOME == 'Em Produção') { //Em produção
                            return "<span style='color:gray;'></span>"
                        } else if (data.ordemStatus.stA_NOME == 'Finalizada') { //Finalizada
                            return "<span style='color:black;'></span>"
                        } else if (data.ordemStatus.stA_NOME == 'Cancelada') { //Cancelada
                            return "<span style='color:gray;'></span>"
                        } else {
                            return "<span style='color:black;'></span>"
                        }
                    }
                }

            ],
        });

        $scope.getOPOverview();
    };

    $scope.getOPOverview = () => {
        $http.get(Url.ordemProducao.overview).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };
}]);