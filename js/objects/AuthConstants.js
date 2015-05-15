angular
	.module('GrowlerTally')
	.factory('AuthConstants', [function() {
		var vm = this;
		vm.Clover_URL = 'https://api.clover.com';
		vm.App_ID = 'PR2XMFRKT1Z2P';
		vm.App_Secret = '5a764ee5-3cf8-e367-b759-349b1afa89e3';

		var tokenRegex = new RegExp("[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}");
		var merchIdRegex = new RegExp("merchant_id=[a-zA-Z0-9]{13}&");
		var token = document.URL.match(tokenRegex);

		if (token !== null) {
			var merchant_id = document.URL.match(merchIdRegex)[0].split('=')[1];

			vm.token = token[0];
			vm.merchant_id = merchant_id.substring(0, merchant_id.length - 1);
		}

		return vm;
	}])