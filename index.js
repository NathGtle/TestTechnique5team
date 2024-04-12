class Bureau {
    constructor(nbPrisesReseau, nbPrisesSecteur, nbPrisesTel, nbChaises, nbTables, nbPersonnes) {
        this.nbPrisesReseau = nbPrisesReseau;
        this.nbPrisesSecteur = nbPrisesSecteur;
        this.nbPrisesTel = nbPrisesTel;
        this.nbChaises = nbChaises;
        this.nbTables = nbTables;
        this.nbPersonnes = nbPersonnes;
    }

    espacedispo() {
        return Math.max(0, (this.nbTables - this.nbPersonnes) + (this.nbChaises - this.nbPersonnes) + (this.nbPrisesTel - this.nbPersonnes) + (this.nbPrisesSecteur - this.nbPersonnes) + (this.nbPrisesReseau - this.nbPersonnes));
    }
}

class BureauDeveloppeur extends Bureau {
    espacedispo() {
        return Math.max(0, (this.nbTables - this.nbPersonnes) + (this.nbChaises - this.nbPersonnes) + (3 * this.nbPrisesSecteur - this.nbPersonnes) + (3 * this.nbPrisesReseau - this.nbPersonnes));
    }
}

class BureauCommercial extends Bureau {
    espacedispo() {
        return Math.max(0, (this.nbTables - this.nbPersonnes) + (2 * this.nbChaises - this.nbPersonnes) + (2 * this.nbPrisesTel - this.nbPersonnes) + (this.nbPrisesSecteur - this.nbPersonnes) + (this.nbPrisesReseau - this.nbPersonnes));
    }
}

class Societe {
    constructor() {
        this.bureaux = [];
    }

    ajouterBureau(bureau) {
        this.bureaux.push(bureau);
    }

    espacedispo() {
        let totalEspaceDispo = 0;
        this.bureaux.forEach(bureau => {
            totalEspaceDispo += bureau.espacedispo();
        });
        return totalEspaceDispo;
    }
}

const societe = new Societe();

// Ajout de 3 bureaux commerciaux
for (let i = 0; i < 3; i++) {
    const bureauCommercial = new BureauCommercial(5, 10, 10, 10, 10, 0);
    societe.ajouterBureau(bureauCommercial);
}

// Ajout de 2 bureaux développeurs
for (let i = 0; i < 2; i++) {
    const bureauDeveloppeur = new BureauDeveloppeur(15, 20, 0, 10, 10, 0);
    societe.ajouterBureau(bureauDeveloppeur);
}

// Boucle d'ajout de personnel
let nbCommerciaux = 0;
let nbDeveloppeurs = 0;

while (societe.espacedispo() > 0) {
    const random = Math.random();
    let bureauIndex = Math.floor(Math.random() * societe.bureaux.length);
    let bureau = societe.bureaux[bureauIndex];
    if (random < 0.5 && bureau instanceof BureauCommercial) {
        nbCommerciaux++;
        bureau.nbPersonnes++;
    } else if (random >= 0.5 && bureau instanceof BureauDeveloppeur) {
        nbDeveloppeurs++;
        bureau.nbPersonnes++;
    }
    console.log(`Nombre de commerciaux : ${nbCommerciaux}`);
    console.log(`Nombre de développeurs : ${nbDeveloppeurs}`);
    societe.bureaux.forEach((bureau, index) => {
        console.log(`Espace disponible dans le bureau ${index + 1}: ${bureau.espacedispo()}`);
    });
    console.log(`Espace disponible dans la société : ${societe.espacedispo()}`);
    console.log("--------------------------------------");
}
