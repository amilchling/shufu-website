Emails = new Meteor.Collection("emails");
EMAIL_DAILY_LIMIT = 200;

Meteor.methods({
	sendEmail: function(from, name, text){
		var subject = "Website inquiry";
		var to = "sam@shufudesign.com";
		var msg = text + "\n FROM:" + name;

		check([from, name, text], [String]);

		var d = new Date.getTime();
		var amt = 0;
		if(Emails.find({date: d}).count() > 0){
			amt = Emails.findOne({date: d}).numSent;
		}
		else{
			Emails.insert({
				date: d,
				numSent: 0
			});
		}

		if(amt < EMAIL_DAILY_LIMIT){

			Email.send({
				to: to,
				from: from,
				subject: subject,
				text: msg
			});
			console.log("email sent from: " + from);
			Emails.update({date: d}, {$inc: {numSent: 1}});
		}
	}
});