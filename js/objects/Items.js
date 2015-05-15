angular
	.module('GrowlerTally')
	.factory('Items', ['AuthConstants', '$resource', function (Constants, $resource) {
		return $resource(
			Constants.Clover_URL + '/v3/merchants/:merchant_id/items?access_token=:token',
			{ merchant_id: Constants.merchant_id, token: Constants.token }
		);
	}]);