var Clover = {
	/*getoAuthToken: function(code) {
		return $.ajax({
			url: 'https://www.clover.com/oauth/token',
			type: 'get',
			data: { client_id: Constants.App_ID, client_secret: Constants.App_Secret, code: code },
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ('Access-Control-Allow-Origin', 'http://growlertally.happycactusdev.com'); 
			},
			success: function(data, error) {
				console.log('data: ' + data);
				Constants.token = data.access_token;
				return true;
			}, 
			error: function() {
				console.log('Error getting token');
				return false;
			}
		});
	},*/
	getCategories: function() {
		// Gets all customers who are part of Growler Tally
		var authHeader = 'Bearer ' + Constants.token;

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
  			if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
		    	// What you want to do on failure
		    	alert(xmlhttp.status + " : " + xmlhttp.responseText);
		  	}
  			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    			// What you want to do on success
    			console.log(xmlhttp.status + ': ' + xmlhttp.responseText);
  			}
		}

		xmlhttp.open('get', Constants.Clover_URL + '/v3/merchants/' + Constants.merchant_id + '/categories', true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader('Authorization', authHeader);
		xmlhttp.send();

		/*return 	$.ajax({
			url: Constants.Clover_URL + '/v3/merchants/' + Constants.merchant_id + '/categories',
			type: 'get',
			dataType: 'json',
			//headers: { 'Authorization': authHeader },
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ('Authorization', 'Bearer ' + Constants.token); 
			},
			success: function(data, error) {
				console.log('categories: ' + data);
				return data;

			},
			error: function() {

			}
		});*/
	}
}