app.controller('ordemProducao', ['$scope', function ($scope) {
    var table = '';
    var _idOP = '';

    $(function () {
        $('#Cadastros').addClass('show');

        table = $('#datatable_ordemProducao').DataTable({
            ajax: {
                url: Url.ordemProducao.def,
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
            responsive: true,
            columns: [{
                data: 'orD_ID'
            },    
            {
                data: 'orG_ID'
            }, 
            {
                data: 'boM_ID'
            },   
            {
                data: 'orD_QUANTITY'
            },
            {
                data: 'orD_DATE_CREATION'
            },              
            {
                data: 'orD_DATE_PLANNED'
            },
            {
                data: 'stA_ID'
            },            
        ],
        });

    });

    $('#datatable_ordemProducao tbody').on('click', 'tr', function () {
        var data = table.row(this).data();

        _idOP = data.orD_ID;
       // $("#inputOP").val(data.ORD_ID);
        $("#inputCentro").val(data.orG_ID);
        $("#inputReceita").val(data.boM_ID);
        $("#inputQtd").val(data.orD_QUANTITY);
        $("#inputDtPrevista").val(data.orD_DATE_PLANNED);
        $("#inputStatus").val(data.stA_ID);
        $("#inputDtCriacao").val(data.orD_DATE_CREATION);

        $("#btnExcluir").css("display", "block");
        $("#btnOP").removeClass("btn-success").addClass("btn-warning").text("Editar");
    });

    $("#btnCancelar").click(function () {
        $("#btnOP").removeClass("btn-warning").addClass("btn-success").text("Cadastrar");
        $("#btnExcluir").css("display", "none");

        $("#inputOP").val("");
        $("#inputCentro").val("");
        $("#inputReceita").val("");
        $("#inputQtd").val("");
        $("#inputDtPrevista").val("");
        $("#inputStatus").val("");
        $("#inputDtCriacao").val("");

    });

    $("#btnOP").click(function () {
        if ($("#btnOP").hasClass("btn-success")) {
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
                    var data = {                                             
                        orD_DATE_CREATION: $("#inputDtPrevista").val(),// $("#inputDtCriacao").val(),
                        orD_QUANTITY: parseInt($("#inputQtd").val()),
                        stA_ID: parseInt($("#inputStatus").val()),
                        orG_ID: parseInt($("#inputCentro").val()),
                        orD_DATE_PLANNED: $("#inputDtPrevista").val(),
                        boM_ID: parseInt($("#inputReceita").val()),
                        orD_ACTIVE: true                    
                    };
                    $.ajax({
                        url: Url.ordemProducao.def,
                        type: 'POST',
                        data: JSON.stringify(data),
                        processData: false,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        success: function () {
                            Swal.fire({
                                title: 'Ordem de Produção cadastrada!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                table.ajax.reload();
                            });
                        },
                        error: function () {
                            Swal.fire({
                                title: 'Refaça a operação',
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
        } else if ($("#btnOP").hasClass("btn-warning")) {
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
                    var data = {
                        orD_ID: _idOP,
                        orD_DATE_CREATION: $("#inputDtPrevista").val(),// $("#inputDtCriacao").val(),
                        orD_QUANTITY: parseInt($("#inputQtd").val()),
                        stA_ID: parseInt($("#inputStatus").val()),
                        orG_ID: parseInt($("#inputCentro").val()),
                        orD_DATE_PLANNED: $("#inputDtPrevista").val(),
                        boM_ID: parseInt($("#inputReceita").val()),
                        orD_ACTIVE: true 
                    };
                    $.ajax({
                        url: Url.ordemProducao.def + `/${_idOP}`,
                        type: 'PUT',
                        data: JSON.stringify(data),
                        processData: false,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        success: function () {
                            Swal.fire({
                                title: 'Ordem de Produção Editada!',
                                type: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(function () {
                                $("#btnCancelar").click();
                                table.ajax.reload();
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
                $.ajax({
                    url: Url.ordemProducao.def + `/${_idOP}`,
                    type: 'DELETE',
                    processData: false,
                    success: function () {
                        Swal.fire({
                            title: 'Ordem de Produção Excluída!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            $("#btnCancelar").click();
                             table.ajax.reload();
                        });
                    },
                    error: function () {
                        Swal.fire({
                            title: 'Refaça operação',
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
            } else {
                $("#btnCancelar").click();
            };
        });
    });
}]);



function getStatusOrdem(){
    var status;

    $.getJSON("http://localhost:5000/api/op_status" , function (data) {
        $.each(data, function (key, val) {
            status += "<option value='" + val.stA_ID+ "'>" + val.stA_NOME+ "</option>";  
            console.log(val.stA_NOME);  
        });

        var header = '<option value=\'\'>Select...</option>';
        $('#inputStatus').html(header + status);
    });

}

/*
function getReceita(){
    var status;

    $.getJSON("http://localhost:5000/api/receita" , function (data) {
        $.each(data, function (key, val) {
            status += "<option value='" + val.stA_ID+ "'>" + val.stA_NOME+ "</option>";  
            console.log(val.stA_NOME);  
        });

        var header = '<option value=\'\'>Select...</option>';
        $('#inputStatus').html(header + status);
    });

}*/

$(function () {

    // getStatusOrdem();

});