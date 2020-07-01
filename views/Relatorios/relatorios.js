app.controller('relatorios', ['$scope', '$route', '$http', function ($scope, $route, $http) {
    $scope.$on('$viewContentLoaded', function () {
        switch ($route.current.originalPath) {
            case "/Relatorio/Carga/MP":
                window.open("http://sql-01/Reports/Pages/Report.aspx?ItemPath=%2fReportPrj_PMTBY%2frptProdRealMPBatch&ViewMode=Detail", "_blank");
                break;
            case "/Relatorio/Carga/ParamProducao":
                window.open("http://sql-01/Reports/Pages/Report.aspx?ItemPath=%2fReportPrj_PMTBY%2frptProdRealBatchParam&ViewMode=Detail", "_blank");
                break;
            case "/Relatorio/GoldenBatch":
                window.open("http://sql-01/Reports/Pages/Report.aspx?ItemPath=%2fReportPrj_PMTBY%2frptProdGoldenBatch&ViewMode=Detail", "_blank");
                break;
            case "/Relatorio/Producao":
                window.open("http://sql-01/Reports/Pages/Report.aspx?ItemPath=%2fReportPrj_PMTBY%2frptProdRealFinal&ViewMode=Detail", "_blank");
                break;
        };
    });
}]);