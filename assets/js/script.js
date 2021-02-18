$(function(){
  // naviguer sur la page via le scroll
  $(".navbar a, footer a").on("click", function(event){
    event.preventDefault();
    let hash = this.hash;

    $("body, html").animate({scrollTop: $(hash).offset().top} , 900 , function(){window.location.hash = hash;});
  });

  // afficher l'année en cours dans le footer
  let date = new Date();
  $("footer h5 span").append(date.getFullYear());

  // valider le formulaire
  $('#contact-form').submit(function(e){
    e.preventDefault();
    $('.c-comments').empty();
    const postdata = $('#contact-form').serialize(); //récupérer et stocker les infos du formulaire
    $.ajax({
      type: 'POST',
      url: 'assets/php/contact.php',
      data: postdata,
      dataType: 'json',
      success: function(result){
          if(result.isSuccess){
            $("#contact-form").append("<p class='c-thank-you'>Votre message a bien été envoyé. Merci de m'avoir contacté :)</p>");
            $("#contact-form")[0].reset();
          } else{
            $("#firstname + .c-comments").html(result.firstnameError);
            $("#name + .c-comments").html(result.nameError);
            $("#email + .c-comments").html(result.emailError);
            $("#phone + .c-comments").html(result.phoneError);
            $("#message + .c-comments").html(result.messageError);
          }
      }

    });

  });
})
