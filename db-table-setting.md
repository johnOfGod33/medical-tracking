-- Active: 1693486785462@@127.0.0.1@3306@medical_record
CREATE TABLE patient(
    id_patient INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_patient VARCHAR(100) NOT NULL,
    prenom_patient VARCHAR(100) NOT NULL,
    email_patient VARCHAR(256) NOT NULL UNIQUE,
    tel_patient VARCHAR(100) NOT NULL UNIQUE,
    mdp_patient VARCHAR(256) NOT NULL,
    sexe_patient VARCHAR(30) NOT NULL,
    adress_patient VARCHAR(100) NOT NULL,
    ville_patient VARCHAR(100) NOT NULL,
    dateNaissance_patient DATE NOT NULL,
    UNIQUE index nomPrenom_patient(nom_patient, prenom_patient)
)
ENGINE = INNODB;

CREATE TABLE carnet(
    id_carnet INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_patient INT UNSIGNED NOT NULL,
    poids_carnet FLOAT,
    taille_carnet FLOAT,
    intolerence_carnet TEXT,
    maladies_carnet TEXT,
    etatsante_carnet VARCHAR(100),
    groupesanguin_carnet VARCHAR(50),
    contacturgence_carnet VARCHAR(50),
    permission_carnet BOOLEAN DEFAULT false,
    constraint fk_id_patient FOREIGN KEY(id_patient) REFERENCES patient(id_patient)
)
ENGINE = INNODB;

CREATE TABLE hopital(
    id_hopital INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_hopital VARCHAR(200) NOT NULL UNIQUE,
    ville_hopital VARCHAR(200) NOT NULL,
    email_hopital VARCHAR(256) NOT NULL UNIQUE,
    tel_hopital VARCHAR(100) NOT NULL UNIQUE,
    mdp_hopital VARCHAR(256) NOT NULL
)
ENGINE = INNODB;

CREATE TABLE docteur(
    id_docteur INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_docteur VARCHAR(200) NOT NULL UNIQUE,
    prenom_docteur VARCHAR(200) NOT NULL,
    ville_docteur VARCHAR(200) NOT NULL,
    email_docteur VARCHAR(256) NOT NULL UNIQUE,
    tel_docteur VARCHAR(100) NOT NULL UNIQUE,
    mdp_docteur VARCHAR(256) NOT NULL,
    UNIQUE index nomPrenom_docteur(nom_docteur, prenom_docteur)
)
ENGINE = INNODB; 

CREATE TABLE consultation(
    id_consultation INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_carnet INT UNSIGNED NOT NULL,
    id_docteur INT UNSIGNED NOT NULL,
    id_hopital INT UNSIGNED NOT NULL,
    temperature_consultation VARCHAR(50) NOT NULL,
    tension_consultation VARCHAR(50) NOT NULL,
    date_consultation DATETIME DEFAULT now(),
    symptome_consultation TEXT NOT NULL,
    constraint fk_id_carnet FOREIGN KEY(id_carnet) REFERENCES carnet(id_carnet),
    constraint fk_id_hopital FOREIGN KEY(id_hopital) REFERENCES hopital(id_hopital),
    constraint fk_id_docteur FOREIGN KEY(id_docteur) REFERENCES docteur(id_docteur)
)
ENGINE = INNODB;

CREATE TABLE analyse(
    id_analyse INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_consultation INT UNSIGNED NOT NULL,
    nom_analyse VARCHAR(100) NOT NULL,
    resultat_analyse TEXT,
    constraint fk_id_consultation FOREIGN KEY(id_consultation) REFERENCES consultation(id_consultation)
)
ENGINE = INNODB;

CREATE TABLE prescription(
    id_prescription INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_consultation INT UNSIGNED NOT NULL,
    nomproduit_prescription VARCHAR(100) NOT NULL,
    dosage_prescription TEXT,
    constraint fk_id_consultation_prescription FOREIGN KEY(id_consultation) REFERENCES consultation(id_consultation)
)
ENGINE = INNODB;

CREATE TABLE demande(
    id_demande INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_patient INT UNSIGNED NOT NULL,
    id_hopital INT UNSIGNED NOT NULL,
    date_demande DATETIME DEFAULT now(),
    etat_demande BOOLEAN DEFAULT false,
    constraint fk_id_patient_demande FOREIGN KEY(id_patient) REFERENCES patient(id_patient),
    constraint fk_id_hopital_demande FOREIGN KEY(id_hopital) REFERENCES hopital(id_hopital)
)
ENGINE = INNODB;

CREATE TABLE intervenants(
    id_hopital INT UNSIGNED NOT NULL,
    id_docteur INT UNSIGNED NOT NULL,
    etat_intervenants BOOLEAN DEFAULT TRUE,
    constraint fk_id_hopital_intervenants FOREIGN KEY(id_hopital) REFERENCES hopital(id_hopital),
    constraint fk_id_docteur_intervenants FOREIGN KEY(id_docteur) REFERENCES docteur(id_docteur),
    constraint pk_merge_id_docteur_id_hopital PRIMARY KEY (id_hopital, id_docteur)
)
ENGINE = INNODB;
