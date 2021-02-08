$(function(){
  // naviguer sur la page via le scroll
  $(".navbar a, footer a").on("click", function(event){
    event.preventDefault();
    var hash = this.hash;

    $("body, html").animate({scrollTop: $(hash).offset().top} , 900 , function(){window.location.hash = hash;});
  });

  // afficher l'année en cours dans le footer
  var date = new Date();
  $("footer h5 span").append(date.getFullYear());

  // valider le formulaire
  $('#contact-form').submit(function(e){
    e.preventDefault();
    $('.comments').empty();
    var postdata = $('#contact-form').serialize(); //récupérer et stocker les infos du formulaire
    $.ajax({
      type: 'POST',
      url: 'assets/php/contact.php',
      data: postdata,
      dataType: 'json',
      success: function(result){
          if(result.isSuccess){
            $("#contact-form").append("<p class='thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>");
            $("#contact-form")[0].reset();
          } else{
            $("#firstname + .comments").html(result.firstnameError);
            $("#name + .comments").html(result.nameError);
            $("#email + .comments").html(result.emailError);
            $("#phone + .comments").html(result.phoneError);
            $("#message + .comments").html(result.messageError);
          }
      }

    });

  });
})
