app.factory('myHttpInterceptor', ['$q', function ($q) {
    return {
        // optional method
        request: function (config) {
            config.headers['Content-Type'] = `application/json`;
            config.headers['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
            return config;
        },

        // optional method
        requestError: function (rejection) {
            // do something on error
            if (rejection.status === 401) {
                Swal.fire({
                    title: 'Token de Acesso Expirou, é necessário relogar',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 5000
                }).then(function () {
                    window.location.href = "login.html";
                });
            } else if (rejection.status === 403) {
                Swal.fire({
                    title: 'Operação não autorizada',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            };

            return $q.reject(rejection);
        },

        // // optional method
        // response: function (response) {
        //     // do something on success
        //     console.log('I am done');
        //     return response;
        // },

        // // optional method
        // responseError: function (rejection) {
        //     // do something on error
        //     if (canRecover(rejection)) {
        //         return responseOrNewPromise
        //     }
        //     return $q.reject(rejection);
        // }
    };
}]);

app.config(['$httpProvider', Interceptor]);

function Interceptor($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
};