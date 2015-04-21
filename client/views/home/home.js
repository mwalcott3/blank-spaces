Template.Home.rendered = function() {
    $('.modal-trigger').leanModal({
        dismissible: false
    });
    setTimeout(function() {
        document.getElementById("mainVideo").play();
    }, 2000);
};