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
Router.route('/contact', {
  template: 'Contact'
});
Router.route('/listing/create', {
  template: 'Listing_Form'
});