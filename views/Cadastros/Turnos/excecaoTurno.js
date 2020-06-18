app.controller('excecaoTurno', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idExcecao = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.table = $('#datatable_excecao').DataTable({
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
                    title: 'Usuários' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Usuários' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
            ],
            responsive: true,
            columns: [{
                    data: 'turno.tuR_NAME'
                },
                {
                    data: 'exC_BEGIN'
                },
                {
                    data: 'exC_END'
                },
                {
                    data: 'exC_REASON'
                }
            ],
            "columnDefs": [{
                "targets": [1, 2],
                render: function (data, type, row) {
                    return moment(data, "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY HH:mm:ss');
                }
            }],
        });

        $http({
            url: Url.turnos.def,
            method: "GET"
        }).then(function successCallback(response) {
            response.data = response.data == undefined ? [] : response.data;
            response.data.map(function (element, index) {
                $("#inputTurno").append(`<option value=${element.tuR_ID}>${element.tuR_NAME}</option>`);
            });
        }, function errorCallback(rejection) {
            console.log(rejection);
        });

        $scope.getExcecoes();
    }); //FIM SCOPE

    $scope.getExcecoes = () => {
        $http.get(Url.turnos.excecao).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $('#datatable_excecao tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        _idExcecao = data.exC_ID;
        $("#inputData").val(moment(data.exC_BEGIN.substr(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY"));
        $("#inputTurno").val(data.tuR_ID);
        $("#inputI").val(data.exC_BEGIN.substr(11, 5));
        $("#inputF").val(data.exC_END.substr(11, 5));
        $("#inputM").val(data.exC_REASON);
        $("#radioFolga").prop("checked", data.exC_REST);
        $("#radioNPadrao").prop("checked", data.exC_NOT_STANDARD);

        $("#btnExcluir").css("display", "block");
        $("#btnExcecao").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        $("#btnExcecao").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputData").val("");
        $("#inputTurno").val("");
        $("#inputI").val("");
        $("#inputF").val("");
        $("#inputM").val("");
        $("#radioFolga").prop("checked", false);
        $("#radioNPadrao").prop("checked", false);
    });

    $("#btnExcecao").click(function () {
        if ($("#btnExcecao").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Exceção no Turno?`,
                // text: `Esta operação não poderá ser desfeita!`,
                type: 'question',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    var data = {
                        exC_REST: $("#radioFolga").prop("checked") ? true : false,
                        exC_NOT_STANDARD: $("#radioNPadrao").prop("checked") ? true : false,
                        exC_BEGIN: `${moment($("#inputData").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputI").val()}:00`,
                        exC_END: `${moment($("#inputData").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputF").val()}:00`,
                        exC_REASON: $("#inputM").val(),
                        tuR_ID: parseInt($("#inputTurno").val())
                    };

                    $http({
                        url: Url.turnos.excecao,
                        method: 'POST',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Exceção Cadastrada!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
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
        } else if ($("#btnExcecao").hasClass("btn-warning")) {
            Swal.fire({
                title: `Editar Exceção?`,
                text: `Esta operação não poderá ser desfeita!`,
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    var data = {
                        exC_ID: _idExcecao,
                        exC_REST: $("#radioFolga").prop("checked") ? true : false,
                        exC_NOT_STANDARD: $("#radioNPadrao").prop("checked") ? true : false,
                        exC_BEGIN: `${moment($("#inputData").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputI").val()}:00`,
                        exC_END: `${moment($("#inputData").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputF").val()}:00`,
                        exC_REASON: $("#inputM").val(),
                        tuR_ID: parseInt($("#inputTurno").val())
                    };

                    $http({
                        url: Url.turnos.excecao + `/${_idExcecao}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Exceção Editada!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
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
        };
    });

    $("#btnExcluir").click(function () {
        Swal.fire({
            title: `Excluir Exceção?`,
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
                    url: Url.turnos.excecao + `/${_idExcecao}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: 'Exceção Excluída!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelar").click();
                        $route.reload();
                    });
                }, function errorCallback() {
                    Swal.fire({
                        title: 'Refaça operação',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        // $("#btnCancelar").click();
                    });
                });
            } else {
                // $("#btnCancelar").click();
            };
        });
    });
}]);