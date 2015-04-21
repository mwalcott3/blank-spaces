Template.Layout.rendered = function() {
    $(".button-collapse").sideNav();
};
Template.Layout.events({
    'click .logout': function() {
        Meteor.logout();
    }

});

Template.login_res.rendered = function() {
    $('.modal-trigger').leanModal({
        dismissible: false
    });
};

Template.login_res.events({
    'submit #register-form': function(e, t) {
        e.preventDefault();
        var username = t.find('#reg_username').value;
        var email = t.find('#reg_email').value;
        var password1 = t.find('#reg_password').value;
        var password2 = t.find('#ver_password').value;
        if (password1 === password2) {
            if (password1.length > 7) {
                Accounts.createUser({
                    email: email,
                    password: password1,
                    username: username
                }, function(err) {
                    if (err) {
                        alert(err);
                    }
                    else {
                        $('#register').closeModal();
                        $('#lean-overlay').remove();
                        console.log("yay");
                    }

                });
            }
            else {
                alert("Password is too short");
            }

        }
        else {
            /* Too lazy to do this correctly*/
            alert("Passwords dont match");
        }
        return false;
    },
    'submit #login-form': function(e, t) {
        e.preventDefault();
        // retrieve the input field values
        var uid = t.find('#uid').value;
        var password = t.find('#password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(uid, password, function(err) {
            if (err) {
                alert(err);
            }
            else {
                $('#login').closeModal();
                $('#lean-overlay').remove();
                console.log("Logged in");
            }
        });
        return false;
    }

});