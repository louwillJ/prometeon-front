app.controller('plantModel', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    var _idPlant = '';

    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        $scope.table = $('#datatable_plantModel').DataTable({
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
                    title: 'Plant Model' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Plant Model' + moment().format("DD.MM.YY"),
                    text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
                    className: 'btn-export',
                    // exportOptions: {
                    //     columns: [0, 1, 2]
                    // }
                },
            ],
            responsive: true,
            columns: [{
                    data: 'elE_ID'
                },
                {
                    data: 'orG_NAME'
                },
                {
                    data: 'orG_ACTIVE'
                }
            ],
            "columnDefs": [{
                    "targets": 0,
                    render: function (data, type, row) {
                        switch (data) {
                            case 1:
                                return "Site";
                            case 2:
                                return "Area";
                            case 3:
                                return "Linha";
                            case 4:
                                return "Equipamento";
                        };
                    }
                },
                {
                    "targets": 2,
                    render: function (data, type, row) {
                        if (data) {
                            return "<i class='fa fa-circle text-success'></i>"
                        } else {
                            return "<i class='fa fa-circle text-danger'></i>"
                        };
                    }
                }
            ],
        });

        $http({
            url: Url.plantModel.element,
            method: "GET"
        }).then(function successCallback(response) {
            response.data = response.data == undefined ? [] : response.data;
            response.data.map(function (element, index) {
                if (element.elE_ACTIVE) {
                    $("#inputNivel").append(`<option value=${element.elE_ID}>${element.elE_NAME}</option>`);
                };
            });
        }, function errorCallback(rejection) {
            console.log(rejection);
        });

        $scope.combos();
        $scope.getPlantModel();
    }); //FIM SCOPE

    $scope.getPlantModel = () => {
        $http.get(Url.plantModel.def).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.combos = () => {
        $("#inputSite").html('<option value="">Selecione:</option>');;
        $("#inputArea").html('<option value="">Selecione:</option>');;
        $("#inputLinha").html('<option value="">Selecione:</option>');;

        for (let index = 1; index < 4; index++) {
            $http({
                url: Url.plantModel.def + `/${index}`,
                method: "GET"
            }).then(function successCallback(response) {
                response.data = response.data == undefined ? [] : response.data;
                response.data.map(function (element, index) {
                    let hash = '';

                    if (element.orG_ACTIVE) {
                        switch (element.elE_ID) {
                            case 1:
                                hash = "Site";
                                break;
                            case 2:
                                hash = "Area";
                                break;
                            case 3:
                                hash = "Linha";
                                break;
                                // case 4:
                                //     hash = "Equipamento";
                                //     break;
                        }
                        $(`#input${hash}`).append(`<option value=${element.orG_ID}>${element.orG_NAME}</option>`);
                    };
                });
            }, function errorCallback(response) {
                console.log(response)
            });
        };
    };

    $("#inputNivel").change(() => {
        switch (parseInt($("#inputNivel").val())) {
            case 1:
                $("#divSite").hide();
                $("#divArea").hide();
                $("#divLinha").hide();
                break;
            case 2:
                $("#divSite").show();
                $("#divArea").hide();
                $("#divLinha").hide();
                break;
            case 3:
                $("#divSite").show();
                $("#divArea").show();
                $("#divLinha").hide();
                break;
            case 4:
                $("#divSite").show();
                $("#divArea").show();
                $("#divLinha").show();
                break;
            default:
                $("#inputDescript").val("");
                $("#inputSite").val("");
                $("#inputArea").val("");
                $("#inputLinha").val("");
                break;
        };
    });

    $('#datatable_plantModel tbody').on('click', 'tr', function () {
        var data = $scope.table.row(this).data();

        switch (data.elE_ID) {
            case 1:
                $("#inputNivel").val(1);
                $("#divLinha").hide();
                $("#divArea").hide();
                $("#divSite").hide();
                break;
            case 2:
                $("#inputNivel").val(2);
                $("#divArea").hide();
                $("#divLinha").hide();
                $("#divSite").show();
                $("#inputSite").val(data.itemUp.orG_ID);
                break;
            case 3:
                $("#inputNivel").val(3);
                $("#divLinha").hide();
                $("#divArea").show();
                $("#inputArea").val(data.itemUp.orG_ID);
                $("#divSite").show();
                $("#inputSite").val(data.itemUp.itemUp.orG_ID);
                break;
            case 4:
                $("#inputNivel").val(4);
                $("#divLinha").show();
                $("#inputLinha").val(data.itemUp.orG_ID);
                $("#divArea").show();
                $("#inputArea").val(data.itemUp.itemUp.orG_ID);
                $("#divSite").show();
                $("#inputSite").val(data.itemUp.itemUp.itemUp.orG_ID);
                break;
        };

        _idPlant = data.orG_ID;
        $("#inputDescript").val(data.orG_NAME);
        $("#checkAtivo").prop("checked", data.orG_ACTIVE);

        $("#btnExcluir").css("display", "block");
        $("#btnPlantModel").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        $("#btnPlantModel").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputNivel").val("");
        $("#inputDescript").val("");
        $("#checkAtivo").prop("checked", false);
        $("#divSite").hide();
        $("#inputSite").val("");
        $("#divArea").hide();
        $("#inputArea").val("");
        $("#divLinha").hide();
        $("#inputLinha").val("");
    });

    $("#btnPlantModel").click(function () {
        if ($("#btnPlantModel").hasClass("btn-success")) {
            var pai = 0;
            var who = 'Site';
            var it = 'o';

            switch ($("#inputNivel").val()) {
                case "2":
                    pai = $("#inputSite").val();
                    who = 'Area';
                    break;
                case "3":
                    pai = $("#inputArea").val();
                    who = 'Linha';
                    it = 'a';
                    break;
                case "4":
                    pai = $("#inputLinha").val();
                    who = 'Equipamento';
                    it = 'o';
                    break;
            };

            Swal.fire({
                title: `Cadastrar ${who}?`,
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
                        ORG_NAME: $("#inputDescript").val(),
                        ELE_ID: parseInt($("#inputNivel").val()),
                        ORG_ID_ITEM_UP: parseInt(pai),
                        ORG_ACTIVE: $("#checkAtivo").prop("checked") ? true : false,
                        ORG_DESCRIPTION: null
                    };

                    $http({
                        url: Url.plantModel.def,
                        method: 'POST',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: `${who} Cadastrad${it}!`,
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
                            $route.reload();
                            $scope.combos();
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
        } else if ($("#btnPlantModel").hasClass("btn-warning")) {
            var pai = 0;
            var who = 'Site';
            var it = '';

            switch ($("#inputNivel").val()) {
                case "2":
                    pai = $("#inputSite").val();
                    who = 'Area';
                    break;
                case "3":
                    pai = $("#inputArea").val();
                    who = 'Linha';
                    it = 'a';
                    break;
                case "4":
                    pai = $("#inputLinha").val();
                    who = 'Equipamento';
                    it = 'o';
                    break;
            };

            Swal.fire({
                title: `Editar ${who}?`,
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
                        ORG_ID: _idPlant,
                        ORG_NAME: $("#inputDescript").val(),
                        ELE_ID: parseInt($("#inputNivel").val()),
                        ORG_ID_ITEM_UP: parseInt(pai),
                        ORG_ACTIVE: $("#checkAtivo").prop("checked") ? true : false,
                        ORG_DESCRIPTION: null
                    };

                    $http({
                        url: Url.plantModel.def + `/${_idPlant}`,
                        method: 'PUT',
                        data: JSON.stringify(data),
                        processData: false
                    }).then(function successCallback() {
                        Swal.fire({
                            title: `${who} Editad${it}!`,
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
                            $route.reload();
                            $scope.combos();
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
        var who = 'Site';
        var it = 'o';

        switch ($("#inputNivel").val()) {
            case "2":
                who = 'Area';
                it = 'a';
                break;
            case "3":
                who = 'Linha';
                it = 'a';
                break;
            case "4":
                who = 'Equipamento';
                it = 'o';
                break;
        };
        Swal.fire({
            title: `Excluir ${who}?`,
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
                    url: Url.plantModel.def + `/${_idPlant}`,
                    method: 'DELETE',
                    processData: false
                }).then(function successCallback() {
                    Swal.fire({
                        title: `${who} Excluíd${it}!`,
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelar").click();
                        $route.reload();
                        $scope.combos();
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