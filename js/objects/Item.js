angular
	.module('GrowlerTally')
	.factory('Item', ['AuthConstants', '$resource',function (Constants, $resource) {
		return $resource(
			Constants.Clover_URL + 'v3/merchants/:merchant_id/items/:item_id?access_token=:token',
			{ merchant_id: Clover.merchant_id, item_id: '@id', token: Constants.access_token }
		);
	}]);