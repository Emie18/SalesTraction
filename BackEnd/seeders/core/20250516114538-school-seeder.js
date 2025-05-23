'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const schools = [
      { school: "Université Paris-Saclay", adresse: "3 Rue Joliot Curie, 91190 Gif-sur-Yvette, France" },
      { school: "Sorbonne University", adresse: "21 Rue de l'École de Médecine, 75006 Paris, France" },
      { school: "École Polytechnique", adresse: "Route de Saclay, 91128 Palaiseau, France" },
      { school: "Université PSL (Paris Sciences et Lettres)", adresse: "60 Rue Mazarine, 75006 Paris, France" },
      { school: "Université Grenoble Alpes", adresse: "621 Avenue Centrale, 38400 Saint-Martin-d'Hères, France" },
      { school: "Université de Strasbourg", adresse: "4 Rue Blaise Pascal, 67000 Strasbourg, France" },
      { school: "Université de Bordeaux", adresse: "351 Cours de la Libération, 33400 Talence, France" },
      { school: "Université Claude Bernard Lyon 1", adresse: "43 Boulevard du 11 Novembre 1918, 69622 Villeurbanne, France" },
      { school: "Université de Montpellier", adresse: "Place Eugène Bataillon, 34095 Montpellier, France" },
      { school: "Aix-Marseille Université", adresse: "58 Boulevard Charles Livon, 13007 Marseille, France" },
      { school: "Université de Lille", adresse: "42 Rue Paul Duez, 59000 Lille, France" },
      { school: "Université de Rennes 1", adresse: "2 Rue du Thabor, 35065 Rennes, France" },
      { school: "Université de Lorraine", adresse: "34 Cours Léopold, 54000 Nancy, France" },
      { school: "Sciences Po Paris", adresse: "27 Rue Saint-Guillaume, 75007 Paris, France" },
      { school: "Université Côte d’Azur", adresse: "28 Avenue Valrose, 06103 Nice, France" },
      { school: "Université de Nantes", adresse: "1 Quai de Tourville, 44035 Nantes, France" },
      { school: "Université Paris 1 Panthéon-Sorbonne", adresse: "12 Place du Panthéon, 75005 Paris, France" },
      { school: "Université de Versailles Saint-Quentin-en-Yvelines", adresse: "55 Avenue de Paris, 78035 Versailles, France" },
      { school: "École Normale Supérieure de Lyon", adresse: "15 Parvis René Descartes, 69007 Lyon, France" },
      { school: "Université Toulouse III - Paul Sabatier", adresse: "118 Route de Narbonne, 31062 Toulouse, France" },

      { school: "Télécom Paris", adresse: "19 Place Marguerite Perey, 91120 Palaiseau, France" },
      { school: "Ensimag (Grenoble INP)", adresse: "681 Rue de la Passerelle, 38400 Saint-Martin-d'Hères, France" },
      { school: "École Normale Supérieure (ENS Paris)", adresse: "45 Rue d'Ulm, 75005 Paris, France" },
      { school: "CentraleSupélec", adresse: "3 Rue Joliot Curie, 91190 Gif-sur-Yvette, France" },
      { school: "IMT Atlantique", adresse: "2 Rue de la Châtaigneraie, 35510 Cesson-Sévigné, France" },
      { school: "École 42", adresse: "96 Boulevard Bessières, 75017 Paris, France" },
      { school: "ENSEEIHT (INP Toulouse)", adresse: "2 Rue Charles Camichel, 31071 Toulouse, France" },
      { school: "INSA Lyon", adresse: "20 Avenue Albert Einstein, 69100 Villeurbanne, France" },
      { school: "ISEP (Institut Supérieur d'Électronique de Paris)", adresse: "28 Rue Notre-Dame des Champs, 75006 Paris, France" },
      { school: "ENSEA", adresse: "6 Avenue du Ponceau, 95014 Cergy-Pontoise, France" },
      { school: "École Centrale de Nantes", adresse: "1 Rue de la Noë, 44321 Nantes, France" },
      { school: "EURECOM", adresse: "Campus SophiaTech, 450 Route des Chappes, 06410 Biot, France" },

      { school: "ISEN Lille (Yncréa Hauts-de-France)", adresse: "33 Rue Magdeleine Hutin, 59046 Lille, France" },
      { school: "ISEN Brest", adresse: "20 Rue Cuirassé Bretagne, 29200 Brest, France" },
      { school: "ISEN Toulon", adresse: "Place Georges Pompidou, 83000 Toulon, France" },
      { school: "ISEN Nantes", adresse: "18 Rue de la Rainière, 44300 Nantes, France" },
      { school: "ISEN Fès (Morocco)", adresse: "Technopark de Fès, Route Ain Chkef, Fès, Maroc" }
    ];

    await queryInterface.bulkInsert(
      'school',
      schools,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('school', null, {});
  }
};
