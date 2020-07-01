app.controller('ordemProducaoOverview', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idOP = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');
        getStatusOrdem();

        $("#btnCancelar").click(function () {
            $("#btnPesquisar").removeClass("btn-warning").addClass("btn-success").text("Pesquisar");
            $("#btnExcluir").css("display", "none");
            $("#CardOPOverview").css("display","none");

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
                }).then(function successCallback(response) {
                    $('#datatable_ordemProducaoOverview').DataTable().clear();
                    $('#datatable_ordemProducaoOverview').DataTable().destroy();
                    // $scope.table = '';
                    

                    if (!response.data) {
                        alert('Registros não encontrados. Por favor refaça a consulta.');
                        $("#btnCancelar").click();
                    } else {

                        $scope.table = $('#datatable_ordemProducaoOverview').DataTable({
                            "aaData": response.data,
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
                                            return "<button id='" + data.orD_ID + "'  name='Produzir' class='btn btn-info btn-sm produzir'>PRODUZIR</button>"
                                        } else if (data.ordemStatus.stA_NOME == 'Em Espera') { //em Espera                                            
                                            return "<button id='" + data.orD_ID + "'  name='Cancelar' class='btn btn-danger btn-sm produzir'>CANCELAR</button>"
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

                        $("#CardOPOverview").css("display","block");
                    }
                }, function errorCallback() {
                    Swal.fire({
                        title: 'Refaça operação',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                });

            } 
        });

        $(document).on('click', '.produzir', function () {
            var classe = $(this).attr("class");
            var _idOP = $(this).attr("id");
            var _operacao = $(this).attr('name');
            console.log(classe + " e id: " + _idOP);

            //var data = table.row($(this).closest('tr')).data();

            //var rowID = $(obj).attr('id');
            //var _operacao = $(obj).attr('name');
            //_idOP = $(obj).closest('tr').find('td:first').html();

            console.log('oi mi ID: ' + _idOP + ' nome da acao: ' + _operacao + "nome da classe "+classe);
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

                                $("#btnPesquisar").click();
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

    $scope.getOPOverview = () => {
        $http.get(Url.ordemProducao.overview).then(function successCallback(response) {
            console.log(response.data);
            
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };
}]);