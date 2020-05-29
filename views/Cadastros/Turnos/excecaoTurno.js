app.controller('excecaoTurno', ['$scope', function ($scope) {
    var table = '';

    $(function () {
        $('#Cadastros').addClass('show');

        table = $('#datatable_excecao').DataTable({
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
            responsive: true
        });
    });

    $('#datatable_excecao tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        $("#inputData").val(moment().format("DD/MM/YYYY"));
        $("#inputTurno").val(data[0]);
        $("#inputI").val(data[1]);
        $("#inputF").val(data[2]);
        $("#inputM").val(data[3]);

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
    });

    $("#btnExcecao").click(function () {
        if ($("#btnExcecao").hasClass("btn-success")) {
            Swal.fire({
                title: `Cadastrar Exceção no Turno?`,
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
                        title: 'Exceção cadastrado!',
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
                    Swal.fire({
                        title: 'Exceção editado!',
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
                Swal.fire({
                    title: 'Exceção excluido!',
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