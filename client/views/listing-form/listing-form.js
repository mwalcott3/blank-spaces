Template.Listing_Form.rendered = function() {
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 5
  });
  //This causes a memory poblem. It adds things to the body but never gets rid of them unless you refresh
  jQuery("#start_root").detach().appendTo('body');
  jQuery("#end_root").detach().appendTo('body');

  $("#location").geocomplete({
    details: ".details"
  })
  $(function() {

    $('#dropzone').on('dragover', function() {
      $(this).addClass('hover');
    });

    $('#dropzone').on('dragleave', function() {
      $(this).removeClass('hover');
    });

    $('#dropzone input').on('change', function(e) {
      var file = this.files[0];

      $('#dropzone').removeClass('hover');

      if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
        return alert('File type not allowed.');
      }

      $('#dropzone').addClass('dropped');
      $('#dropzone img').remove();

      if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
        var reader = new FileReader(file);

        reader.readAsDataURL(file);

        reader.onload = function(e) {
          var data = e.target.result,
            $img = $('<img />').attr('src', data).fadeIn();

          $('#dropzone div').html($img);
        };
      }
      else {
        var ext = file.name.split('.').pop();

        $('#dropzone div').html(ext);
      }
    });
  });

};


Template.Listing_Form.events({
  'submit #listing-form': function(e, t) {
    e.preventDefault();
    var lat = t.find('#lat').value;
    var lng = t.find('#lng').value;
    var adress = t.find('#adress').value;
    var title = t.find('#title').value;
    var start_date = t.find('#start').value;
    var end_date = t.find('#end').value;
    var type = t.find('#type').value;
    var length = t.find('#length').value;
    var width = t.find('#width').value;
    var price = t.find('#price').value;
    var description = t.find('#description').value;
    var image = $("#dropzone img").attr("src");
    var area = length * width;
    /*Daterange is not set up*/
    var listing = {
      "loc": [lng * 1, lat * 1],
      "title": title,
      "start_date": start_date,
      "end_date": end_date,
      "price": price * 1,
      "description": description,
      "adress": adress,
      "type": type,
      "width": width * 1,
      "length": length * 1,
      "area": area,
      "lat": lat * 1,
      "lng": lng * 1,
      "image": image,
      "user": Meteor.userId()
    };
    Listings.insert(listing, function(error, result) {
      if (error) {
        alert(error)
      }
      else {
        window.location.href = "/account"
      }
    })
  }
});