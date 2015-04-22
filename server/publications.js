Meteor.publish('nearbyListings', function(bottomLeft, topRight) {
  if (!bottomLeft && !topRight) {
    return [];
  }
  return Listings.find({
    loc: {
      $geoWithin: {
        $box: [bottomLeft, topRight]
      }
    }
  })
});

Meteor.publish('userListings', function(uid) {
  return Listings.find({user: uid});
});