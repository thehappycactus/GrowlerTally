angular
	.module('GrowlerTally')
	.controller('CustomerListControl', [
		'AuthConstants', 'Categories', 'CategoryItems', 'Items', 
		'CategoryItems', 'ItemStocks', 'LxDialogService', 'LxNotificationService',
		function (Constants, Categories, CategoryItems, Items, CategoryItems, ItemStocks, LxDialogService, LxNotificationService) {
		
		var vm = this;
		vm.customers = new Array();

		if (Constants.token != null) {

			Categories.get({ 
				merchant_id: Constants.merchant_id,
				token: Constants.token
			}).$promise.then( 
				function (data) {
					// Search for the "Growler Tally" category
					for (var i = 0; i < data.elements.length; i++) {
						if (data.elements[i].name === 'Growler Tally') {
							Constants.tally_catid = data.elements[i].id;

							// Once found, use the Growler Tally category ID to get all items
							// under the Growler Tally category
							CategoryItems.get({ 
								merchant_id: Constants.merchant_id,
								tally_catid: Constants.tally_catid,
								token: Constants.token 
							}).$promise.then(
								function (data) {

									// Create a modified array of Customer objects for display in table
									for (var j = 0; j < data.elements.length; j++) {
										var nameSections = data.elements[j].name.split(' ');

										var customer = {
											index: j + 1,
											id: data.elements[j].id,
											fName: nameSections[0],
											lName: nameSections[1],
											phoneNbr: nameSections[2],
											count: data.elements[j].stockCount
										}
										vm.customers.push(customer);
									}
								},
								function (error) {
									console.log('thar be an error in getCustomers');
								});

							break;
						}
					}
				},	
				function (error) {
					console.log('thar be an error in getCategories');
				});
		} else {
			window.location.href = 'https://www.clover.com/oauth/authorize' + 
				'?client_id=' + Constants.App_ID + 
				'&response_type=token';
		}

		vm.openAddDialog = function(dialogId) {
			LxDialogService.open(dialogId);
		}

		vm.openUpdateDialog = function (custIdx) {
			vm.uFirstName = vm.customers[custIdx - 1].fName;
			vm.uLastName = vm.customers[custIdx - 1].lName;
			vm.uPhoneNumber = vm.customers[custIdx - 1].phoneNbr;
			vm.uQuantity = vm.customers[custIdx - 1].count;

			LxDialogService.open('updateCustomer');
		}

		vm.closeDialog = function(type, dialogId, text) {
			if (type === 'success') {
				LxNotificationService.success(text);
			} else if (type === 'info') {
				LxNotificationService.info(text);
			} else if (type === 'error') {
				LxNotificationService.error(text);
			}

			LxDialogService.close(dialogId);
		}

		vm.addCustomer = function(event) {
			var newItem = {
			  "price": "0",			// (long): Price of the item, typically in cents; use priceType and merchant currency to determine actual item price
			  "hidden": false,		// (boolean, optional): True if this item is hidden from register
			  //"unitName": "",		// (string, optional): Unit name, e.g. oz, lb - ** useful field later? **
			  "isRevenue": false,	// (boolean, optional): True if this item should be counted as revenue, for example gift cards and donations would not
			  "name": vm.firstName + ' ' + vm.lastName + ' ' + vm.phoneNumber,
			};

			// Save the new item
			Items.save(newItem, 
				function (data) {
					console.log('create customer succeeded');

					// Create a customer/category association
					var catItemAssociation = { 
						"elements": [
							{
								"category": { "id": Constants.tally_catid }, 
								"item": { "id": data.id }
							}
						]
					};

					CategoryItems.save(catItemAssociation,
						function (data) {
							console.log('category-item association done');
						});

					// Create stock/item association
					var stockItemAssociation = {
						"elements": [
							{
								"item": { "id": data.id },
								"quantity": vm.quantity
							}
						]
					};

					ItemStocks.save(stockItemAssociation, 
						function (data) {
							console.log('stock-item association done');
						});

					// Create customer from data
					var customer = {
						index: vm.customers.length + 1,
						id: data.id,
						fName: data.name.split(' ')[0],
						lName: data.name.split(' ')[1],
						phoneNbr: data.name.split(' ')[2],
						count: vm.quantity
					}

					// Clear dialog fields
					vm.firstName = '';
					vm.lastName = '';
					vm.phoneNumber = '';
					vm.quantity = '';

					// Push new customer onto list
					vm.customers.push(customer)

					// Close dialog with success
					vm.closeDialog('success', 'newCustomer', 'New Customer Created!');
				},
				function (error) {
					console.log('create customer failed');
					vm.closeDialog('error', 'newCustomer', 'New Customer not created successfully.  Please try again.');
				});
		}

		vm.updateCustomer = function (event) {
			var updateItem = {
				"id": vm.item_id,
		  		"price": "0",			// (long): Price of the item, typically in cents; use priceType and merchant currency to determine actual item price
		  		"hidden": false,		// (boolean, optional): True if this item is hidden from register
		  		//"unitName": "",		// (string, optional): Unit name, e.g. oz, lb - ** useful field later? **
		  		"isRevenue": false,	// (boolean, optional): True if this item should be counted as revenue, for example gift cards and donations would not
		  		"name": vm.uFirstName + ' ' + vm.uLastName + ' ' + vm.uPhoneNumber,
			};

			Item.save(updateItem,
				function (data) {
					console.log('update complete: ' + data);
				});

			var stockItemAssociation = {
				"elements": [
					{
						"item": { "id": vm.item_id },
						"quantity": vm.uQuantity
					}
				]
			};

			ItemStocks.save(stockItemAssociation, 
				function (data) {
					console.log('stock-item association done');
				});
		}

		vm.incGrowlerCount = function (item_id, custIdx) {
			var customer = vm.customers[custIdx - 1];
			var stockItemAssociation = {
				"elements": [
					{
						"item": { "id": item_id },
						"quantity": ++customer.count
					}
				]
			};

			ItemStocks.save(stockItemAssociation, 
				function (data) {
					console.log('stock-item association done');
					LxNotificationService.success('Growler Count Increased');
				});
		}

		vm.decGrowlerCount = function (item_id, custIdx) {
			var customer = vm.customers[custIdx - 1];
			var stockItemAssociation = {
				"elements": [
					{
						"item": { "id": item_id },
						"quantity": --customer.count
					}
				]
			};

			ItemStocks.save(stockItemAssociation, 
				function (data) {
					console.log('stock-item association done');
					LxNotificationService.success('Growler Count Decreased');

				});
		}

		// 1. Call the clover URL to get all customers in the Growler Tally group/category
		// 2. Parse returned object into our proprietary "customer object" (below)
		// 3. Add our customer array to this scope
		/*	customers = [
				{ fName: 'Mary', lName: 'Gezo', phoneNbr: '678-665-9184', count: 3 },
				{ fName: 'Mark', lName: 'Sims', phoneNbr: '678-123-4567', count: 5 },
				{ fName: 'Steven', lName: 'Akins', phoneNbr: '404-123-4567', count: 3 },
				{ fName: 'Kate', lName: 'Hocking', phoneNbr: '706-123-4567', count: 2 }
			]
		}*/


}]);