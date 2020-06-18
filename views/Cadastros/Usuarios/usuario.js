app.controller('usuario', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idUser = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.table = $('#datatable_usuarios').DataTable({
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
                    data: 'usR_NAME'
                },
                {
                    data: 'usR_EMAIL'
                },
                {
                    data: 'userAccessLevel.leV_NAME'
                }
            ],
            // "columnDefs": [{
            //         "targets": 0,
            //         render: function (data, type, row) {
            //             return moment(row.dtInicio).format('DD/MM/YYYY HH:mm');
            //         }
            //     }
            // ],
        });

        $http({
            url: Url.acesso.grupo,
            method: "GET",
        }).then(function successCallback(response) {
            response.data = response.data == undefined ? [] : response.data;
            $("#inputAcesso").append(`<option selected value="">Selecione:</option>`);
            response.data.forEach(function (element, index) {
                $("#inputAcesso").append(`<option value=${element.leV_ID}>${element.leV_NAME}</option>`);
            });
        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.getUsuarios();
    });

    $scope.getUsuarios = () => {
        $http.get(Url.usuarios.def).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $('#datatable_usuarios tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        _idUser = data.usR_ID;
        $("#inputUser").val(data.usR_NAME);
        $("#inputNome").val(data.usR_EMAIL);
        $("#inputAcesso").val(data.usR_ACCESS_LEVEL);

        $("#btnExcluir").css("display", "block");
        $("#btnUsuario").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        $("#btnUsuario").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputUser").val("");
        $("#inputNome").val("");
        $("#inputSenha").val("");
        $("#inputAcesso").val("");
    });

    $("#btnUsuario").click(function () {
        if ($("#btnUsuario").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Usuário?`,
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
                        usR_NAME: $("#inputUser").val(),
                        usR_EMAIL: $("#inputNome").val(),
                        usR_SENHA: $("#inputSenha").val(),
                        USR_ACCESS_LEVEL: parseInt($("#inputAcesso").val()),
                        usR_ACTIVE: true
                    };

                    $http({
                        url: Url.usuarios.def,
                        method: 'POST',
                        data: JSON.stringify(data)
                    }).then(function successCallback(response) {
                        Swal.fire({
                            title: 'Usuário Cadastrado!',
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
        } else if ($("#btnUsuario").hasClass("btn-warning")) {
            Swal.fire({
                title: `Editar Usuário?`,
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
                        usR_ID: _idUser,
                        usR_NAME: $("#inputUser").val(),
                        usR_EMAIL: $("#inputNome").val(),
                        usR_SENHA: $("#inputSenha").val(),
                        USR_ACCESS_LEVEL: parseInt($("#inputAcesso").val()),
                        usR_ACTIVE: true
                    };

                    $http({
                        url: Url.usuarios.def + `/${_idUser}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Usuário Editado!',
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
            title: `Excluir Usuário?`,
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
                    url: Url.usuarios.def + `/${_idUser}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: 'Usuário Excluído!',
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