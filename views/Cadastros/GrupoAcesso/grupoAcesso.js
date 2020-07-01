app.controller("grupoAcesso", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$on('$viewContentLoaded', function () {
        $('#Cadastros').addClass('show');

        // $(document).ready(function () {
        //     $anchorScroll('redirectToTop');
        // });

        $scope.table = $('#datatable_grupo').DataTable({
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
            responsive: true,
            columns: [{
                    data: 'leV_NAME'
                },
                {
                    data: null
                },
            ],
            "columnDefs": [{
                "targets": 1,
                "data": null,
                render: function (data, type, row) {
                    return '<a class="btn btn-simple btn-icon btn-sm" href="#/Cadastros/GrupoAcesso/Edit?screen=' + data.leV_ID + '"><i class="fas fa-eye"></i></a>'
                },
            }]
        });

        $scope.getGrupoAcesso();
    }); //FIM SCOPE

    $scope.getGrupoAcesso = () => {
        $http.get(Url.acesso.grupo).then(function successCallback(response) {
            $scope.table.clear().draw();
            $scope.table.rows.add(response.data).draw();
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $('body').on('click', '.btnCriarGrupo', function () {
        Swal.fire({
            title: 'Criar novo Grupo de Acesso',
            html: '<div>' +
                '<label class="col-form-label">Nome do Grupo</label>' +
                '<input type="text" class="form-control" id="nomeGrupo">' +
                '</div>',
            preConfirm: () => {
                if ($('#nomeGrupo').val()) {
                    var data = {
                        leV_NAME: $("#nomeGrupo").val(),
                        leV_ACTIVE: true
                    };

                    $http({
                        url: Url.acesso.grupo,
                        method: 'POST',
                        data: JSON.stringify(data)
                    }).then(function successCallback() {
                        Swal.fire({
                            title: 'Grupo de Acesso Cadastrado!',
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
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
                }
            }
        });
    });
}]); // FIM CONTROLLER