'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const schools = [
      { name: "Université Paris-Saclay", adresse: "3 Rue Joliot Curie, 91190 Gif-sur-Yvette, France" },
      { name: "Sorbonne University", adresse: "21 Rue de l'École de Médecine, 75006 Paris, France" },
      { name: "École Polytechnique", adresse: "Route de Saclay, 91128 Palaiseau, France" },
      { name: "Université PSL (Paris Sciences et Lettres)", adresse: "60 Rue Mazarine, 75006 Paris, France" },
      { name: "Université Grenoble Alpes", adresse: "621 Avenue Centrale, 38400 Saint-Martin-d'Hères, France" },
      { name: "Université de Strasbourg", adresse: "4 Rue Blaise Pascal, 67000 Strasbourg, France" },
      { name: "Université de Bordeaux", adresse: "351 Cours de la Libération, 33400 Talence, France" },
      { name: "Université Claude Bernard Lyon 1", adresse: "43 Boulevard du 11 Novembre 1918, 69622 Villeurbanne, France" },
      { name: "Université de Montpellier", adresse: "Place Eugène Bataillon, 34095 Montpellier, France" },
      { name: "Aix-Marseille Université", adresse: "58 Boulevard Charles Livon, 13007 Marseille, France" },
      { name: "Université de Lille", adresse: "42 Rue Paul Duez, 59000 Lille, France" },
      { name: "Université de Rennes 1", adresse: "2 Rue du Thabor, 35065 Rennes, France" },
      { name: "Université de Lorraine", adresse: "34 Cours Léopold, 54000 Nancy, France" },
      { name: "Sciences Po Paris", adresse: "27 Rue Saint-Guillaume, 75007 Paris, France" },
      { name: "Université Côte d’Azur", adresse: "28 Avenue Valrose, 06103 Nice, France" },
      { name: "Université de Nantes", adresse: "1 Quai de Tourville, 44035 Nantes, France" },
      { name: "Université Paris 1 Panthéon-Sorbonne", adresse: "12 Place du Panthéon, 75005 Paris, France" },
      { name: "Université de Versailles Saint-Quentin-en-Yvelines", adresse: "55 Avenue de Paris, 78035 Versailles, France" },
      { name: "École Normale Supérieure de Lyon", adresse: "15 Parvis René Descartes, 69007 Lyon, France" },
      { name: "Université Toulouse III - Paul Sabatier", adresse: "118 Route de Narbonne, 31062 Toulouse, France" },

      { name: "Télécom Paris", adresse: "19 Place Marguerite Perey, 91120 Palaiseau, France" },
      { name: "Ensimag (Grenoble INP)", adresse: "681 Rue de la Passerelle, 38400 Saint-Martin-d'Hères, France" },
      { name: "École Normale Supérieure (ENS Paris)", adresse: "45 Rue d'Ulm, 75005 Paris, France" },
      { name: "CentraleSupélec", adresse: "3 Rue Joliot Curie, 91190 Gif-sur-Yvette, France" },
      { name: "IMT Atlantique", adresse: "2 Rue de la Châtaigneraie, 35510 Cesson-Sévigné, France" },
      { name: "École 42", adresse: "96 Boulevard Bessières, 75017 Paris, France" },
      { name: "ENSEEIHT (INP Toulouse)", adresse: "2 Rue Charles Camichel, 31071 Toulouse, France" },
      { name: "INSA Lyon", adresse: "20 Avenue Albert Einstein, 69100 Villeurbanne, France" },
      { name: "ISEP (Institut Supérieur d'Électronique de Paris)", adresse: "28 Rue Notre-Dame des Champs, 75006 Paris, France" },
      { name: "ENSEA", adresse: "6 Avenue du Ponceau, 95014 Cergy-Pontoise, France" },
      { name: "École Centrale de Nantes", adresse: "1 Rue de la Noë, 44321 Nantes, France" },
      { name: "EURECOM", adresse: "Campus SophiaTech, 450 Route des Chappes, 06410 Biot, France" },

      { name: "ISEN Lille (Yncréa Hauts-de-France)", adresse: "33 Rue Magdeleine Hutin, 59046 Lille, France" },
      { name: "ISEN Brest", adresse: "20 Rue Cuirassé Bretagne, 29200 Brest, France" },
      { name: "ISEN Toulon", adresse: "Place Georges Pompidou, 83000 Toulon, France" },
      { name: "ISEN Nantes", adresse: "18 Rue de la Rainière, 44300 Nantes, France" },
      { name: "ISEN Fès (Morocco)", adresse: "Technopark de Fès, Route Ain Chkef, Fès, Maroc" }
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
