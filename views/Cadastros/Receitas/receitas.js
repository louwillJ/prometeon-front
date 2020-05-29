app.controller('receitas', ['$scope', function ($scope) {

    $(function () {
        $('#Cadastros').addClass('show');

        var tableR = $('#datatable_receita').DataTable({
            "jQueryUI": true,
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
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" ,//+
                // "<'row'<'col-sm-12 'B>>",
            // buttons: [{
            //         extend: 'excelHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            //     {
            //         extend: 'pdfHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            // ],
            responsive: true
        });

        var tableMP = $('#datatable_mp').DataTable({
            "jQueryUI": true,
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
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" ,//+
                // "<'row'<'col-sm-12 'B>>",
            // buttons: [{
            //         extend: 'excelHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            //     {
            //         extend: 'pdfHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            // ],
            responsive: true
        });

        var tableOP = $('#datatable_op').DataTable({
            "jQueryUI": true,
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
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" ,//+
                // "<'row'<'col-sm-12 'B>>",
            // buttons: [{
            //         extend: 'excelHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para Excel" class="far fa-file-excel"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            //     {
            //         extend: 'pdfHtml5',
            //         title: 'Usuários' + moment().format("DD.MM.YY"),
            //         text: '<i title="Exportar para PDF" class="far fa-file-pdf"></i>',
            //         className: 'btn-export',
            //         // exportOptions: {
            //         //     columns: [0, 1, 2]
            //         // }
            //     },
            // ],
            responsive: true
        });
    });

    $('#datatable_turnos tbody').on('click', 'tr', function () {
        var data = tableR.row(this).data();
        $("#inputId").val(data[0]);
        $("#inputInicio").val(data[1]);
        $("#inputFim").val(data[2]);
        $("#inputRefI").val(data[3]);
        $("#inputRefF").val(data[4]);
        $("#inputValI").val(data[5]);
        $("#inputValF").val(data[6]);

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
                type: 'warning',
                showCancelButton: true,
                reverseButtons: true,
                allowOutsideClick: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Turno cadastrado!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelar").click();
                    });
                } else {
                    $("#btnCancelar").click();
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
                    Swal.fire({
                        title: 'Turno editado!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        $("#btnCancelar").click();
                    });
                } else {
                    $("#btnCancelar").click();
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
                Swal.fire({
                    title: 'Turno excluido!',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    $("#btnCancelar").click();
                });
            } else {
                $("#btnCancelar").click();
            };
        });
    });
}]);