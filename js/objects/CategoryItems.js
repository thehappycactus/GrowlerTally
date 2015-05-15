angular
	.module('GrowlerTally')
	.factory('CategoryItems', ['AuthConstants', '$resource', function (Constants, $resource) {
		return $resource(
				Constants.Clover_URL + '/v3/merchants/:merchant_id/categories/:tally_catid/items?access_token=:token',
				{ merchant_id: Constants.merchant_id, token: Constants.token },
				{ get: {
					method: 'GET',
					isArray: false
				}},
				{ post: {
					method: 'POST',
					isArray: false
				}});
	}]);
