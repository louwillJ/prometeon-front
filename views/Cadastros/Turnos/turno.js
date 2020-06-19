app.controller('turno', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idTurno = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.table = $('#datatable_turnos').DataTable({
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
                    data: 'tuR_NAME'
                },
                {
                    data: 'tuR_BEGIN'
                },
                {
                    data: 'tuR_END'
                },
                {
                    data: 'tuR_INTERVAL_BEGIN'
                },
                {
                    data: 'tuR_INTERVAL_END'
                },
                {
                    data: 'tuR_VALIDATE_BEGIN'
                },
                {
                    data: 'tuR_VALIDATE_END'
                }
            ],
            "columnDefs": [{
                "targets": [5, 6],
                render: function (data, type, row) {
                    return moment(data, "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY HH:mm:ss');
                }
            }],
        });

        $scope.getTurnos();
    }); //FIM SCOPE

    $scope.getTurnos = () => {
        $http.get(Url.turnos.def).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $('#datatable_turnos tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        _idTurno = data.tuR_ID;
        $("#inputId").val(data.tuR_NAME);
        $("#inputInicio").val(data.tuR_BEGIN.substr(0, 5));
        $("#inputFim").val(data.tuR_END.substr(0, 5));
        $("#inputRefI").val(data.tuR_INTERVAL_BEGIN.substr(0, 5));
        $("#inputRefF").val(data.tuR_INTERVAL_END.substr(0, 5));
        $("#inputValI").val(moment(data.tuR_VALIDATE_BEGIN.substr(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY"));
        $("#inputValF").val(moment(data.tuR_VALIDATE_END.substr(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY"));

        $("#btnExcluir").css("display", "block");
        $("#btnTurno").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        $("#btnTurno").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputId").val("");
        $("#inputInicio").val("");
        $("#inputFim").val("");
        $("#inputRefI").val("");
        $("#inputRefF").val("");
        $("#inputValI").val("");
        $("#inputValF").val("");
    });

    $("#btnTurno").click(function () {
        if ($("#btnTurno").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Turno?`,
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
                        tuR_NAME: $("#inputId").val(),
                        tuR_BEGIN: $("#inputInicio").val() + ":00",
                        tuR_END: $("#inputFim").val() + ":00",
                        tuR_INTERVAL_BEGIN: $("#inputRefI").val() + ":00",
                        tuR_INTERVAL_END: $("#inputRefF").val() + ":00",
                        tuR_VALIDATE_BEGIN: `${moment($("#inputValI").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputInicio").val()}:00`,
                        tuR_VALIDATE_END: `${moment($("#inputValF").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputFim").val()}:00`,
                        tuR_ACTIVE: true
                    };
                    
                    $http({
                        url: Url.turnos.def,
                        method: 'POST',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Turno cadastrado!',
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
        } else if ($("#btnTurno").hasClass("btn-warning")) {
            Swal.fire({
                title: `Editar Turno?`,
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
                        tuR_ID: _idTurno,
                        tuR_NAME: $("#inputId").val(),
                        tuR_BEGIN: $("#inputInicio").val() + ":00",
                        tuR_END: $("#inputFim").val() + ":00",
                        tuR_INTERVAL_BEGIN: $("#inputRefI").val() + ":00",
                        tuR_INTERVAL_END: $("#inputRefF").val() + ":00",
                        tuR_VALIDATE_BEGIN: `${moment($("#inputValI").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputInicio").val()}:00`,
                        tuR_VALIDATE_END: `${moment($("#inputValF").val(), "DD/MM/YYYY").format("YYYY-MM-DD")}T${$("#inputFim").val()}:00`,
                        tuR_ACTIVE: true
                    };

                    $http({
                        url: Url.turnos.def + `/${_idTurno}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Turno Editado!',
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
            title: `Excluir Turno?`,
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
                    url: Url.turnos.def + `/${_idTurno}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: 'Turno Excluído!',
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