const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Sert les fichiers statiques du dossier "public"

// Variables globales pour suivre les joueurs, leurs clics et l'état de la partie
let players = {};
let clicks = { player1: 0, player2: 0 };
let gameStarted = false;
let gameTime = 10000; // Durée de la partie en millisecondes (10 secondes)

io.on('connection', (socket) => {
    // Assigner un numéro de joueur (1 ou 2) si la partie n'a pas encore deux joueurs
    if (Object.keys(players).length < 2) {
        players[socket.id] = Object.keys(players).length + 1;
        socket.emit('playerNumber', players[socket.id]); // Envoyer le numéro de joueur au client

        // Démarrer la partie lorsque les deux joueurs sont connectés
        if (Object.keys(players).length === 2) {
            io.emit('startGame'); // Informer les clients que la partie commence
            gameStarted = true;

            // Décompte du temps de jeu
            setTimeout(() => {
                io.emit('endGame', clicks); // Envoyer les résultats à la fin de la partie
                gameStarted = false;
                clicks = { player1: 0, player2: 0 }; // Réinitialiser les clics pour la prochaine partie
            }, gameTime);
        }
    }

    // Gestion des clics de chaque joueur
    socket.on('click', () => {
        if (gameStarted) {
            if (players[socket.id] === 1) {
                clicks.player1 += 1;
            } else if (players[socket.id] === 2) {
                clicks.player2 += 1;
            }
            io.emit('updateClicks', clicks); // Envoyer les clics mis à jour aux deux joueurs
        }
    });

    // Gérer la déconnexion d'un joueur
    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', players); // Informer les clients qu'un joueur s'est déconnecté
        if (Object.keys(players).length < 2) {
            gameStarted = false; // Arrêter la partie si un joueur quitte
            clicks = { player1: 0, player2: 0 }; // Réinitialiser les clics
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});