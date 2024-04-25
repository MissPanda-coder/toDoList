const express = require("express");
const cors = require("cors");
const db = require("./server");
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors());


// Importation des routes

const tasksRoutes = require("./routes/tasks.js");
const statusRoutes = require("./routes/status.js");
const archivedRoutes = require("./routes/archived.js");    


// Utilisation des routes
app.use('/tasks', tasksRoutes);
app.use('/status', statusRoutes);
app.use('/archived', archivedRoutes);


// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données MySQL");
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

