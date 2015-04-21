Router.configure({
  layoutTemplate: 'Layout'
});
Router.route('/', {
  template: 'Home'
});
Router.route('/browse', {
  template: 'Browse'
});
Router.route('/account', {
  template: 'Account'
});
Router.route('/listing/create', {
  template: 'Listing_Form'
});