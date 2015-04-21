Router.configure({
  layoutTemplate: 'Layout'
});
Router.route('/', {
  template: 'Home'
});
Router.route('/browse', {
  template: 'Browse'
});
Router.route('/faq', {
  template: 'FAQ'
});
Router.route('/account', {
  template: 'Account'
});
Router.route('/contact', {
  template: 'Contact'
});
Router.route('/listing/create', {
  template: 'Listing_Form'
});