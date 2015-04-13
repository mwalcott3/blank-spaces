Router.configure({
  layoutTemplate: 'Layout'
})

Router.route('/', {
  template: 'Home'
})
Router.route('/browse', {
  template: 'Browse'
})