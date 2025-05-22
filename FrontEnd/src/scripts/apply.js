
import { API } from './api';

export async function applyToOffer(studentId, offerId, motivation) {
  const bodyData = {
    student: parseInt(studentId),
    offer: parseInt(offerId),
    motivation: motivation
  };

  console.log("Données envoyées:", bodyData);

  try {
    const response = await API.post("/offer/apply", JSON.stringify(bodyData), {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("Réponse OK, prêt à retourner");
    console.log("Status réponse:", response.status);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // ✅ Ne pas parser le JSON si on sait que l'API ne renvoie rien
    return;
  } catch (error) {
    console.error('Erreur dans applyToOffer:', error);
    throw error;
  }
}
