// Écouter l'événement de soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche le comportement par défaut de la soumission du formulaire
  
    // Récupérer les valeurs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validation simple (vous pouvez ajouter des vérifications plus avancées)
    if (email && password) {
      // Rediriger vers la page du jeu (index.html)
      window.location.href = "index.html";  // Assurez-vous que "index.html" existe
    } else {
      // Affiche une alerte si les champs ne sont pas remplis
      alert('Veuillez remplir tous les champs.');
    }
  });