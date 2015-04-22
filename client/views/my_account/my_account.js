Template.Account.rendered = function() {
    $('ul.tabs').tabs();
};
Template.Listings.created = function () {
    Meteor.subscribe('userListings', Meteor.userId());
};
Template.listingCards.helpers({
  listings: function () {
    return Listings.find({user: Meteor.userId()});
  }
});
Template.listingCards.events({
    'click .deleteListing': function(e, t) {
        e.preventDefault();
        var id = e.currentTarget.parentElement.id;
        Listings.remove(id);
    },
    'click .editListing': function(e, t) {
        e.preventDefault();
        var id = e.currentTarget.parentElement.id;
        alert("Not done yet. Ill try to make this work later")
    }
        
});