app.controller('ordemProducao', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idOP = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.table = $('#datatable_ordemProducao').DataTable({
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
            columnDefs: [
                {
                    targets: 2,
                    render: function (d, t, data) {
                    if (data.receita == null) {
                        return data.data
                    } else {
                        return data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE 
                    }
                    }
                },
                {
                    targets: 5,
                    render: function (data) {
                        return moment(data).format('DD/MM/YYYY hh:mm');
                    }
                },
                {
                    targets: 6,
                    render: function (data) {
                        return moment(data).format('DD/MM/YYYY');
                    }
                },
                {
                    targets: 7,
                    render: function (data) {
                        if (data == 'Criada') { //criada
                            return "<span style='color:orange;'>" + data + "</span>"
                        } else if (data == 'Em Espera') { //Em espera
                            return "<span style='color:green;'>" + data + "</span>"
                        } else if (data == 'Em Produção') { //Em produção
                            return "<span style='color:blue;'>" + data + "</span>"
                        } else if (data == 'Finalizada') { //Finalizada
                            return "<span style='color:brown;'>" + data + "</span>"
                        } else if (data == 'Cancelada') { //Cancelada
                            return "<span style='color:gray;'>" + data + "</span>"
                        } else {
                            return "<span style='color:black;'>" + data + "</span>"
                        }
                    }
                }
            ],
            responsive: true,
            columns: [{
                    data: 'orD_ID'
                },
                {
                    data: 'orG_ID'
                },
                {
                    data: 'receita.c_ESPEC'
                },
                {
                    data: 'material.maT_DESC'
                },
                {
                    data: 'orD_QUANTITY'
                },
                {
                    data: 'orD_DATE_PLANNED'
                },
                {
                    data: 'orD_DATE_CREATION'
                },
                {
                    data: 'ordemStatus.stA_NOME'
                },
            ],
        })

        $scope.getOPs();
        getReceita();
        getStatusOrdem();

    });

    $scope.getOPs = () => {
        $http.get(Url.ordemProducao.def).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };


    $('#datatable_ordemProducao tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        //Só é possiel editar Ordem de Produção com status "Criadas".
        if (data.ordemStatus.stA_ID == 1) {
            $("#btnOP").prop("disabled", false);
        } else {
            $("#btnOP").prop("disabled", true);
        }

        //---------------------------------------------------------------------
        //uma receita vinculada anteriormente a uma OP pode estar Inativa, caso esteja Inativa, deverá selecionar a receita
        //na versão atual, que está Ativa, contida no select da Receita.

        //iguala o texto da linha selecionada à formatação contida no text do select
        var receitaText = data.receita.c_ESPEC + "-" + data.receita.maT_SAP_CODE + " - " + data.material.maT_DESC;

        //$("#selectIdReceita").find('option:selected').removeAttr("selected");
        $("#selectIdReceita").find('option').removeAttr("selected");

         $("#selectIdReceita option").filter(function() {
            return $(this).text() == receitaText;
        }).attr('selected', true);

        //---------------------------------------------------------------------


        _idOP = data.orD_ID;
        // $("#inputOP").val(data.ORD_ID);
        $("#inputOP").val(data.orD_ID);
        $("#inputCentro").val(data.orG_ID);

        $("#inputCespec").val(data.receita.c_ESPEC);
        $("#inputSapMatCode").val(data.receita.maT_SAP_CODE);

        $("#inputQtd").val(data.orD_QUANTITY);
        $("#inputDtPrevista").val(moment(data.orD_DATE_PLANNED).format('DD/MM/YYYY'));
        $("#inputStatus").val(data.ordemStatus.stA_ID);
        $("#inputDtCriacao").val(moment(data.orD_DATE_CREATION).format('DD/MM/YYYY hh:mm'));

        $("#btnExcluir").css("display", "block");
        $("#btnOP").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        _idOP = '';
        $("#btnOP").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnOP").prop("disabled", false);
        $("#btnExcluir").css("display", "none");

        $("#inputOP").val("");
        $("#inputCentro").val("");
        $("#inputQtd").val("");
        $("#inputDtPrevista").val("");
        $("#inputStatus").val("");
        $("#inputDtCriacao").val("");
        $("#selectIdReceita").find('option:selected').removeAttr("selected");
        $("#selectIdReceita").find('option').removeAttr("selected");
        $("#selectIdReceita").val("");
        $("#inputCespec").val("");
        $("#inputSapMatCode").val("");

    });

    $("#btnOP").click(function () {
        if ($("#btnOP").hasClass("btn-success")) {

            $("#inputStatus").val("");
            //$("#inputStatus").prop('disabled',true);

            if ($('#selectIdReceita option:selected').val() != "") {
              
                if ($("#inputQtd").val() != "") {

                    if ($("#inputDtPrevista").val() != "") {

                        Swal.fire({
                            title: `Cadastrar Ordem de Produção?`,
                            // text: `Esta operação não poderá ser desfeita!`,
                            type: 'warning',
                            showCancelButton: true,
                            reverseButtons: true,
                            allowOutsideClick: false,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.value) {

                                var dataPrevista = moment($("#inputDtPrevista").val(), "DD/MM/YYYY");

                                //Feito isso basta definir o formato de saída:
                                console.log(dataPrevista.format("YYYY-MM-DDT00:00:00"));
                                console.log(dataPrevista.format("YYYY-MM-DD") + " oi: " + $("#inputDtPrevista").val());

                                var data = {
                                    orD_DATE_CREATION: moment().format(), //nasce com a data atual
                                    orD_QUANTITY: parseInt($("#inputQtd").val()),
                                    stA_ID: 1, // Nasce como Criada //parseInt($("#inputStatus").val()),
                                    orG_ID: parseInt($("#inputCentro").val()),
                                    orD_DATE_PLANNED: dataPrevista, //$("#inputDtPrevista").val(),
                                    iD_RECEITA: parseInt($('#selectIdReceita option:selected').val()),
                                    maT_SAP_CODE: $("#inputSapMatCode").val(),
                                    c_ESPEC: $("#inputCespec").val(),
                                    orD_ACTIVE: true
                                };

                                $http({
                                    url: Url.ordemProducao.def,
                                    method: 'POST',
                                    data: JSON.stringify(data),
                                    processData: false
                                }).then(function successCallback() {
                                    Swal.fire({
                                        title: 'Ordem de Produção Cadastrada!',
                                        type: 'success',
                                        showConfirmButton: false,
                                        timer: 2000
                                    }).then(function () {
                                        //$("#btnCancelar").click();                                        
                                        //$scope.getOPs();
                                        $route.reload();
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
                    
                    } else {
                        Swal.fire({
                            title: 'Favor preencher a Data Prevista para Produção.',
                            type: 'info',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            // $("#btnCancelar").click();
                            $("#inputDtPrevista").focus();
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'É necessário informar a quantidade.',
                        type: 'info',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        // $("#btnCancelar").click();
                        $("#inputQtd").focus();
                    });
                }

            } else {
                Swal.fire({
                    title: 'É necessário selecionar uma receita.',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    // $("#btnCancelar").click();
                    $("#selectIdReceita").focus();
                });

            }
        } else if ($("#btnOP").hasClass("btn-warning")) {

            if ($('#selectIdReceita option:selected').val() != "") {

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

                        //var dtPrevista = moment(new Date($("#inputDtPrevista").val())).format("YYYY-MM-DDT00:00:00");
                        //var dtCriacao = moment(new Date($("#inputDtCriacao").val())).format("YYYY-MM-DDTHH:mm:ss");
                        var dataPrevista = moment($("#inputDtPrevista").val(), "DD/MM/YYYY");
                        var dtCriacao = moment($("#inputDtCriacao").val(), "DD/MM/YYYY HH:mm")

                        var data = {
                            orD_ID: _idOP,
                            orD_DATE_CREATION: dtCriacao, // $("#inputDtCriacao").val(),
                            orD_QUANTITY: parseInt($("#inputQtd").val()),
                            stA_ID: parseInt($("#inputStatus").val()),
                            orG_ID: parseInt($("#inputCentro").val()),
                            orD_DATE_PLANNED: dataPrevista,
                            iD_RECEITA: parseInt($('#selectIdReceita option:selected').val()),
                            maT_SAP_CODE: $("#inputSapMatCode").val(),
                            c_ESPEC: $("#inputCespec").val(),
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
                                //$("#btnCancelar").click();
                                //$scope.getOPs();
                                $route.reload();
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
            } else {
                Swal.fire({
                    title: 'É necessário selecionar uma receita.',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    // $("#btnCancelar").click();
                    $("#selectIdReceita").focus();
                });

            }
        };
    });

    $('#selectIdReceita').on('change', function () {

        var valueSelected = $('#selectIdReceita option:selected').text();

        var ids = valueSelected.split("-");

        $("#inputCespec").val(ids[0]);
        $("#inputSapMatCode").val(ids[1]);


    });

    $("#btnExcluir").click(function () {
        Swal.fire({
            title: `Excluir Ordem de Produção?`,
            text: `Esta operação não poderá ser desfeita!`,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $http({
                    url: Url.ordemProducao.def + `/${_idOP}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: 'Ordem de Produção Excluída!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelar").click();
                        $scope.getOPs();

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
                $("#btnCancelar").click();
            };
        });
        $("#inputStatus").prop("disabled", true);
    });

}]);