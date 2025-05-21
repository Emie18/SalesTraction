/**
 * Fonction pour postuler à une offre
 * @param {number} studentId - ID du compte étudiant
 * @param {number} offerId - ID de l'offre
 * @param {string} motivation - Motivation saisie par l'étudiant
 * @returns {Promise<Object>} - La réponse de l'API
 */
export async function applyToOffer(studentId, offerId, motivation) {
  // URL de l'endpoint pour postuler
  const url = 'http://localhost:3000/offer/apply';
  
  // Préparation des données pour le body de la requête
  const bodyData = {
    student: parseInt(studentId),
    offer: parseInt(offerId),
    motivation: motivation
  };
  console.log(bodyData);
  try {
    // Envoi de la requête POST
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });
    
    // Vérification si la requête a réussi
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Conversion de la réponse en JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la postulation:', error);
    throw error;
  }
}
