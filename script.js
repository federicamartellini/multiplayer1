const socket = io();

let playerNumber = null; // Numéro du joueur (1 ou 2)

// Afficher un message au joueur pour indiquer son numéro
socket.on('playerNumber', (number) => {
    playerNumber = number;
    document.getElementById('playerInfo').innerText = `Vous êtes le joueur ${playerNumber}`;
});

// Lorsque le jeu commence
socket.on('startGame', () => {
    document.getElementById('gameStatus').innerText = 'La partie a commencé ! Cliquez le plus possible !';

    // Activer le bouton de clic
    document.getElementById('clickButton').disabled = false;
});

// Gérer l'action de clic
document.getElementById('clickButton').addEventListener('click', () => {
    socket.emit('click'); // Envoyer l'événement de clic au serveur
});

// Mettre à jour les clics en temps réel
socket.on('updateClicks', (clicks) => {
    document.getElementById('player1Clicks').innerText = `Joueur 1: ${clicks.player1} clics`;
    document.getElementById('player2Clicks').innerText = `Joueur 2: ${clicks.player2} clics`;
});

// Lorsque le jeu se termine
socket.on('endGame', (clicks) => {
    document.getElementById('gameStatus').innerText = 'La partie est terminée !';
    document.getElementById('player1Clicks').innerText = `Joueur 1: ${clicks.player1} clics`;
    document.getElementById('player2Clicks').innerText = `Joueur 2: ${clicks.player2} clics`;

    // Désactiver le bouton de clic après la partie
    document.getElementById('clickButton').disabled = true;
});

// Gérer la déconnexion d'un joueur
socket.on('playerDisconnected', () => {
    document.getElementById('gameStatus').innerText = 'Un joueur a quitté la partie. Le jeu est annulé.';
    document.getElementById('clickButton').disabled = true; // Désactiver le bouton de clic
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
  
    // Récupérer les valeurs des champs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Vérifier si l'email et le mot de passe ne sont pas vides
    if (email && password) {
      // Simuler une vérification de connexion réussie
      // Redirection vers la page du jeu
      window.location.href = "index.html";
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  });