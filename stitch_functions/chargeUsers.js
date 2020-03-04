exports = function (chargeToken, planId) {

  var user_email = context.user.data.email;
  var user_id = context.user.id;

  if ( ! user_id) {
    return { error: 'Unauthorized access.' };
  }

  var serviceStripe = context.services.get('stripe');
  var stripeSecretKey = context.values.get('stripeSecretKeys');
  // Array containing valid plandId values; return error if a given planId is not in here
  var chargePlanIds = context.values.get('chargePlanIds');
  if (chargePlanIds.indexOf(planId) == -1) {
    return { error: 'Invalid plan.' };
  }

  var planAmount = parseInt(planId.split('days')[1]);
  var planDays = parseInt(planId.split('days')[0]);
  var planDescription = '$' + (planAmount / 100) + '/' + planDays + ' days';
  console.log(planDescription);

  var response = serviceStripe.post({
    url: 'https://' + stripeSecretKey + '@api.stripe.com/v1/charges' +
      '?amount=' + planAmount +
      '&currency=usd' +
      '&description=' + encodeURI(planDescription) +
      '&metadata[user_email]=' + user_email +
      '&metadata[user_id]=' + user_id +
      '&source=' + chargeToken
  });

  var responseJSON = EJSON.parse(response.body.text());

  if (responseJSON.captured) {
    // Charge successful
    console.log('CHARGE SUCCESS');

    // Get user account data
    var collectionAccounts = context.services.get('mongodb-atlas').db('users').collection('accounts');
    var userAccount = collectionAccounts.findOne({_id: user_id});
    var userDateRenew = userAccount.dateRenew;

    /*
      Update users.accounts:
      Add planDays
      Add to renewHistory
    */
    var today = new Date();
    var newRenewDate;

    if (userDateRenew >= today) {
      newRenewDate = userDateRenew.setDate(userDateRenew.getDate() + planDays);
    }
    else {
      newRenewDate = today.setDate(today.getDate() + planDays);
    }
    // Convert unix timestamp to date object
    newRenewDate = new Date(newRenewDate);

    console.log('NEW RENEW DATE', newRenewDate);

    collectionAccounts.updateOne(
      {_id: user_id},
      {
        $set: {
          dateRenew: newRenewDate,
        },
        $push: {
          renewHistory: {
            date: new Date(),
            planId: planId
          }
        }
      }
    );

    return { success: true };
  }

  console.log('CHARGE FAILED');

  return responseJSON;
};
