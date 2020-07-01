app.controller('materiais', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    var _idMat = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        //CARREGA DATA TABLE:
        if ($.fn.dataTable.isDataTable('#datatable_material')) {
            $('#datatable_material').DataTable().clear();
            $('#datatable_material').DataTable().destroy();
        }

        $scope.table = $('#datatable_material').DataTable({
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
            columnDefs: [{
                targets: 2,
                render: function (d, t, data) {
                    if (data.maT_COD_TYPE == 0) {
                        return "-"
                    } else {
                        return data.tipoMaterial.maT_TYPE
                    }
                }
            }, ],
            responsive: true,
            columns: [{
                    data: 'maT_SAP_CODE'
                },
                {
                    data: 'maT_DESC'
                },
                {
                    data: 'maT_COD_TYPE'
                }
            ],
        })

        $scope.getTableMaterial();
        getMaterial();
        getTipoMaterial();
    });

    $scope.getTableMaterial = () => {
        $http.get(Url.material.def).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $('#datatable_material tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        _idMat = data.maT_SAP_CODE;
        var tipoMat;

        if (data.maT_COD_TYPE == 0) {
            tipoMat = ""
        } else {
            tipoMat = data.tipoMaterial.maT_ID
        }
        $("#selectMaterial").val(data.maT_SAP_CODE);
        $("#selectTipoMaterial").val(tipoMat);
        $("#selectmaT_CODE").val(data.maT_CODE);
        $("#selectcnT_CODE").val(data.cnT_CODE);
        $("#inputmaT_DESC").val(data.maT_DESC);

        //$("#btnExcluir").css("display", "block");
        //$("#btnMaterial").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        _idMat = '';
        //$("#btnOP").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        //$("#btnOP").prop("disabled", false);
        //$("#btnExcluir").css("display", "none");

        $("#selectMaterial option:selected").removeAttr('selected');
        $("#selectTipoMaterial option:selected").removeAttr('selected');
        $("#selectMaterial").val("");
        $("#selectTipoMaterial").val("");
        $("#selectmaT_CODE").val("");
        $("#selectcnT_CODE").val("");
        $("#inputmaT_DESC").val("");

    });

    $("#btnMaterial").click(function () {
        if ($("#btnMaterial").hasClass("btn-warning")) {

            if ($('#selectMaterial option:selected').val() != "") {

                Swal.fire({
                    title: `Alterar Tipo de Material?`,
                    // text: `Esta operação não poderá ser desfeita!`,
                    type: 'warning',
                    showCancelButton: true,
                    reverseButtons: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {

                        var idMaterial = $("#selectMaterial").val()
                        var data = {
                            maT_SAP_CODE: $("#selectMaterial").val(),
                            maT_CODE: $("#selectmaT_CODE").val(),
                            cnT_CODE: $("#selectcnT_CODE").val(),
                            maT_DESC: $("#inputmaT_DESC").val(),
                            maT_COD_TYPE: parseInt($("#selectTipoMaterial").val())
                        };

                        $http({
                            url: Url.material.def + `${idMaterial}`,
                            method: 'PUT',
                            data: JSON.stringify(data),
                            processData: false
                        }).then(function successCallback() {
                            Swal.fire({
                                title: 'Material Cadastrado!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                $scope.getTableMaterial();
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

            } else {
                Swal.fire({
                    title: 'É necessário selecionar um material.',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    // $("#btnCancelar").click();
                    $("#selectMaterial").focus();
                });

            }
        }
    });

    /*
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
    */
}]);