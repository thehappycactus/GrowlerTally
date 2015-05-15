angular
	.module('GrowlerTally')
	.factory('Categories', ['$resource', 'AuthConstants', function ($resource, Constants) {
		return $resource(
			Constants.Clover_URL + '/v3/merchants/:merchant_id/categories?access_token=:token',
			{ merchant_id: Constants.merchant_id, token: Constants.token },
			{ 'get': { 
				method: 'GET', 
				isArray: false
				} 
			});
	}]);