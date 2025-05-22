// api/regionService.js
import { API } from './api';

export const getRegions = async () => {
  try {
    const response = await API.get('/data/regions', {}, false);
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getRegions :', error);
    return [];
  }
};
export const getCommissions = async () => {
  try {
    const response = await API.get('/data/commissions', {}, false);
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getCommission :', error);
    return [];
  }
};

export const getModes = async () => {
  try {
    const response = await API.get('/data/modes', {}, false);
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getMode :', error);
    return [];
  }
};
export const getSchools = async () => {
  try {
    const response = await API.get('/data/schools', {}, false);
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getSchools :', error);
    return [];
  }
};
export const getLanguages = async () => {
  try {
    const response = await API.get('/data/languages', {}, false); 
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getLanguages :', error);
    return [];
  }
};
export const getStates = async () => {
  try {
    const response = await API.get('/data/states', {}, false); 
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getStates :', error);
    return [];
  }
};
export const getSectors = async () => {
  try {
    const response = await API.get('/data/sectors', {}, false);
    if (!response.ok) {
      throw new Error('Error when we get the response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getSectors :', error);
    return [];
  }
};

export const getStudentDetails = async () => {
  try {
    const session = JSON.parse(localStorage.getItem('session'));

    // Vérifie que la session existe et que le type est bien 'student'
    if (!session || session.type !== 'student') {
      throw new Error('No valid student session found.');
    }

    const response = await API.get(`/students/get?id=${session.id}`, {}, false);

    if (!response.ok) {
      throw new Error('Failed to fetch student details');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error in getStudentDetails:', error);
    return null; // ou {} selon ce que tu veux recevoir
  }
};

export const getStartUpDetails = async () => {
  try {
    const session = JSON.parse(localStorage.getItem('session'));

    // Vérifie que la session existe et que le type est bien 'student'
    if (!session || session.type !== 'startup') {
      throw new Error('No valid startup session found.');
    }

    const response = await API.get(`/startup/get?id=${session.id}`, {}, false);

    if (!response.ok) {
      throw new Error('Failed to fetch startup details');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error in getStartUpDetails:', error);
    return null; // ou {} selon ce que tu veux recevoir
  }
};
export const getOffers = async ({ name, sector, region, commission, mode } = {}) => {
  try {
    const params = new URLSearchParams();
    const session = JSON.parse(localStorage.getItem('session'));

    // Vérifie que la session existe et que le type est bien 'student'
    if (!session || session.type !== 'student') {
      throw new Error('No valid student session found.');
    }
    console.log(session.id)

    if(session.id) params.append("id",session.id)
    if (name) params.append("name", name);
    if (sector) params.append("sector", sector);
    if (region) params.append("region", region);
    if (commission) params.append("commission", commission);
    if (mode) params.append("mode", mode);

    const url =
      params.toString().length > 0
        ? `/offer/all?${params.toString()}`
        : "/offer/all";

    const response = await API.get(url, {}, false);
    console.log(url);


    if (!response.ok) {
      throw new Error("Error when we get the response");
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error in getOffers:", error);
    return [];
  }
};

export const getOffers_for_Startup = async ({ id } = {}) => {
  try {

    const url =`/startup/offer/${id}`

    const response = await API.get(url, {}, false);
    console.log(url);

    if (!response.ok) {
      throw new Error("Error when we get the response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getOffers_for_Startup :", error);
    return [];
  }
};

export const getTinder = async ({ id } = {}) => {
  try {

    const url =`/match/suggestion/${id}`

    const response = await API.get(url, {}, false);
    console.log(url);

    if (!response.ok) {
      throw new Error("Error when we get the response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getTinder :", error);
    return [];
  }
};