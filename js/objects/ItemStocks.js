angular
	.module('GrowlerTally')
	.factory('ItemStocks', [ 'AuthConstants', '$resource', function (Constants, $resource) {
		return $resource(
			Constants.Clover_URL + '/v3/merchants/:merchant_id/item_stocks/:item_id?access_token=:token',
			{ merchant_id: Constants.merchant_id, item_id: '@id', token: Constants.token }
		);
	}]);