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
    console.error('Error in getRegions :', error);
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
    console.error('Error in getRegions :', error);
    return [];
  }
};
