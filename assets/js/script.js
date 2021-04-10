$(function(){
  //Boîte de dialogue interactive
  let location = prompt('Dans quelle ville êtes-vous situé ?');
  while (location === "" || location === null){
    location = prompt('Entrez le nom de votre ville: ');
  }
  if (location === "Nantes"){
    $("#about .c-heading h3").after("<h4>3 jours à l'école/7 jours en entreprise</h4>");
    $("#about .c-heading .c-button1").attr('href', 'docs/CV_Drucilla_DEROCHE.pdf');
    $("#education .c-education-block:first span").after("<h4>My DigitalSchool - Nantes</h4>");
    $("#education .c-education-block:first h4").after("<h5>Bachelor Développeur Web</h5>");
    $("#education .c-education-block:first .c-green-divider").after("<p>Programme : <a href='https://www.mydigitalschool.com/bachelor-developpeur-digital-web?o=programme' target='_blank'>Développeur Web</a></p>");
    $("#education .c-education-block:first p").after("<p>Contact : <a href='mailto:camille.simon@mydigitalschool.com'>Camille SIMON</a></p>");
  }
  else if(location === "Paris"){
    $("#about .c-heading h3").after("<h4>1 jour à l'école/4 jours en entreprise</h4>");
    $("#about .c-heading .c-button1").attr('href', 'docs/CV_DEROCHE_DRUCILLA.pdf');
    $("#education .c-education-block:first span").after("<h4>Estiam - Paris</h4>");
    $("#education .c-education-block:first h4").after("<h5>3e année Spécialisation Data & Application Development</h5>");
    $("#education .c-education-block:first .c-green-divider").after("<p>Contenu : Développement d’applications mobiles, Java C#, JavaScript avancé, Business Intelligence, Méthodes Agile, Scrum, Cisco CCNA Security, Administration OS Serveurs…</p>");
  }
  else{
    $("#about .c-heading .c-button1").attr('href', 'docs/CV Drucilla DEROCHE.pdf');
    $("#education .col-md-3:first").remove();
  }

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
