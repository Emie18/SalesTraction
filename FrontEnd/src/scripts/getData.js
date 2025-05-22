// api/regionService.js
export const getRegions = async () => {
  try {
    const response = await fetch('http://localhost:3000/data/regions');
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
    const response = await fetch('http://localhost:3000/data/commissions');
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
    const response = await fetch('http://localhost:3000/data/modes');
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
    const response = await fetch('http://localhost:3000/data/schools');
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
    const response = await fetch('http://localhost:3000/data/languages');
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
    const response = await fetch('http://localhost:3000/data/states');
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
    const response = await fetch('http://localhost:3000/data/sectors');
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

    const response = await fetch(`http://localhost:3000/students/get?id=${session.id}`);

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

    const response = await fetch(`http://localhost:3000/startup/get?id=${session.id}`);

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
    if (!session || session.type !== 'startup') {
      throw new Error('No valid startup session found.');
    }
    
    if(session.id) params.append("id",session.id)
    if (name) params.append("name", name);
    if (sector) params.append("sector", sector);
    if (region) params.append("region", region);
    if (commission) params.append("commission", commission);
    if (mode) params.append("mode", mode);

    const url =
      params.toString().length > 0
        ? `http://localhost:3000/offer/all?${params.toString()}`
        : "http://localhost:3000/offer/all";

    const response = await fetch(url);
    console.log(url);

    if (!response.ok) {
      throw new Error("Error when we get the response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getOffers:", error);
    return [];
  }
};

18

export const getOffers_for_Startup = async ({ id } = {}) => {
  try {

    const url =`http://localhost:3000/startup/offer/${id}`

    const response = await fetch(url);
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

    const url =`http://localhost:3000/match/suggestion/${id}`

    const response = await fetch(url);
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