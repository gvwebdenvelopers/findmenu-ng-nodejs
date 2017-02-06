(function () {
    'use strict';

angular
        .module('blocks.localstorageService')
        .factory('localstorageService', localstorage);

localstorage.$inject =['$timeout', '$filter', '$q'];
    
    /* @ngInject */
    function localstorage ($timeout, $filter, $q) {
        return {
        GetAll : GetAll,
        GetById : GetById,
        GetByUsername : GetByUsername,
        Create : Create,
        Update : Update,
        Delete : Delete
        };
///////////////////////////////////////////////////////////////////
        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve({ success: true, message: 'GetAll success', data: getUsers() });
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            if(user === null){
                deferred.resolve({ success: false, message: 'GetById error', data: null });
            }else{
                deferred.resolve({ success: true, message: 'GetById success', data: user });
            }
            return deferred.promise;
        }

        function GetByUsername(usuario) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { usuario: usuario });
            var user = filtered.length ? filtered[0] : null;
            if(user === null){
                deferred.resolve({ success: false, message: 'GetByUsername error', data: null });
            }else{
                deferred.resolve({ success: true, message: 'GetByUsername success', data: user });
            }
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();
            $timeout(function () {
                GetByUsername(user.user)
                    .then(function () {
                        var users = getUsers();
                        // assign id
                        var lastUser = users[users.length - 1] || { id: 0 };
                        user.id = lastUser.id + 1;

                        // save to local storage
                        users.push(user);
                        setUsers(users);
                        deferred.resolve({ success: true, message: 'User created success' });
                    });
            }, 1000);
            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            //deferred.resolve();
            deferred.resolve({ success: true, message: 'User updated success' });
            return deferred.promise;
        }
        
        function Delete(id) {
            var deferred = $q.defer();
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve({ success: true, message: 'User deleted success' });
            return deferred.promise;
        }

        // private functions
        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        }
        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
 }

}());
