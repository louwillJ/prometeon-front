app.controller('excecaoTurno', ['$scope', function ($scope) {
    var _table = '';
    var _idExcecao = '';

    $(function () {
        $('#Cadastros').addClass('show');

        _table = $('#datatable_excecao').DataTable({
            ajax: {
                url: Url.turnos.excecao,
                method: 'GET',
                dataSrc: '',
                crossDomain: true
            },
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
                    data: 'tuR_ID'
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
            // "columnDefs": [{
            //     "targets": 0,
            //     render: function (data, type, row) {
            //         console.log(getTurName(data));
            //         return getTurName(data);

            //     }
            // }],
            //     public long EXC_ID {get; set;}
            // public int EXC_REST {get; set;}
            // public int EXC_NOT_STANDARD {get; set;}
            // public string EXC_BEGIN {get; set;}
            // public string EXC_END {get; set;}
            // public string EXC_REASON {get; set;}
            // public long TUR_ID {get; set;}
        });

        $.ajax({
            url: Url.turnos.def,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            data = data == undefined ? [] : data;
            data.map(function (element, index) {
                $("#inputTurno").append(`<option value=${element.tuR_ID}>${element.tuR_NAME}</option>`);
            });
        });;
    });

    $('#datatable_excecao tbody').on('click', 'tr', function () {
        var data = _table.row(this).data();
        console.log(data);

        _idExcecao = data.exC_ID;
        $("#inputData").val(data.exC_BEGIN.substr(0, 10));
        $("#inputTurno").val(data.tuR_ID);
        $("#inputI").val(data.exC_BEGIN.substr(11, 6));
        $("#inputF").val(data.exC_END.substr(11, 6));
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
                        exC_REST: $("#radioFolga").prop("checked") ? 1 : 0,
                        exC_NOT_STANDARD: $("#radioNPadrao").prop("checked") ? 1 : 0,
                        exC_BEGIN: $("#inputData").val() + " " + $("#inputI").val(),
                        exC_END: $("#inputData").val() + " " + $("#inputF").val(),
                        exC_REASON: $("#inputM").val(),
                        tuR_ID: parseInt($("#inputTurno").val()),
                    };

                    $.ajax({
                        url: Url.turnos.excecao,
                        type: 'POST',
                        data: JSON.stringify(data),
                        processData: false,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        success: function () {
                            Swal.fire({
                                title: 'Turno cadastrado!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                _table.ajax.reload();
                            });
                        },
                        error: function () {
                            Swal.fire({
                                title: 'Refaça operação',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                // $("#btnCancelar").click();
                            });
                        }
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
                        exC_REST: $("#radioFolga").prop("checked") ? 1 : 0,
                        exC_NOT_STANDARD: $("#radioNPadrao").prop("checked") ? 1 : 0,
                        exC_BEGIN: $("#inputData").val() + " " + $("#inputI").val(),
                        exC_END: $("#inputData").val() + " " + $("#inputF").val(),
                        exC_REASON: $("#inputM").val(),
                        tuR_ID: parseInt($("#inputTurno").val()),
                    };
                    console.log(data);

                    $.ajax({
                        url: Url.turnos.excecao + `/${_idExcecao}`,
                        type: 'PUT',
                        data: JSON.stringify(data),
                        processData: false,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        success: function () {
                            Swal.fire({
                                title: 'Exceção Editada!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                _table.ajax.reload();
                            });
                        },
                        error: function () {
                            Swal.fire({
                                title: 'Refaça operação',
                                type: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                // $("#btnCancelar").click();
                            });
                        }
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
                $.ajax({
                    url: Url.turnos.excecao + `/${_idExcecao}`,
                    type: 'DELETE',
                    processData: false,
                    success: function () {
                        Swal.fire({
                            title: 'Exceção Excluída!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
                            _table.ajax.reload();
                        });
                    },
                    error: function () {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            // $("#btnCancelar").click();
                        });
                    }
                });
            } else {
                // $("#btnCancelar").click();
            };
        });
    });
}]);