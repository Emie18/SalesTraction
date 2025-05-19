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
