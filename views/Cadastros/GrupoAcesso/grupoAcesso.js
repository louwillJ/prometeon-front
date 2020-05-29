app.controller("grupoAcesso", function ($scope, $location, $route, $anchorScroll) {

        $scope.$on('$viewContentLoaded', function () {

            // $(document).ready(function () {
            //     $anchorScroll('redirectToTop');
            // });

            $('#datatable_grupo').DataTable({
                // ajax: {
                //     url: SpiUrl.acesso.grupos,
                //     method: 'GET',
                //     dataSrc: '',
                //     headers: {
                //         "Content-Type": "application/json",
                //         "User": Cookies.get('UId'),
                //         "Screen": $route.routes[$location.path()].controllerAs
                //     },
                // },
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
                columns: [
                    { data: 'name' },
                    { data: null },
                ],
                "columnDefs": [{
                    "targets": 1,
                    "data": null,
                    render: function (data, type, row) {
                        return '<a class="btn btn-simple btn-icon btn-sm" href="#/grupo_edit?' + data.id + '"><i class="fas fa-eye"></i></a>'
                    },
                }]
            });

            $('body').on('click', '.btnCriarGrupo', function () {
                Swal.fire({
                    title: 'Criar novo Grupo de Acesso',
                    html:
                        '<div>' +
                        '<label class="col-form-label">Nome do Grupo</label>' +
                        '<input type="text" class="form-control" id="nomeGrupo">' +
                        '</div>',
                    preConfirm: () => {
                        if ($('#nomeGrupo').val()) {
                            data = { name: $('#nomeGrupo').val() };
                            $.ajax({
                                // url: SpiUrl.acesso.grupos,
                                // type: 'POST',
                                // data: JSON.stringify(data),
                                // processData: false,
                                // headers: {
                                //     "Content-Type": "application/json",
                                //     "User": Cookies.get('UId'),
                                //     "Screen": $route.routes[$location.path()].controllerAs
                                // },
                                success: function () {
                                    swal({
                                        title: "Grupo cadastrado!",
                                        showConfirmButton: false,
                                        type: "success",
                                        timer: 2000
                                    }).then(function () {
                                        location.reload();
                                    })
                                },
                                error: function (jqXhr, textStatus, errorThrown) {
                                    console.log(errorThrown);
                                    swal({
                                        title: "Ops, algo deu errado!",
                                        showConfirmButton: false,
                                        type: "error",
                                        timer: 2000
                                    })
                                }
                            });
                        }
                    }
                });
            });
        }); //FIM SCOPE

    }); // FIM CONTROLLER