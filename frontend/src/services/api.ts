import axiosInstance from '../helpers/axiosInstance';


export const fetchSongs = async () => {
  try {
    const response = await axiosInstance.get('/songs');
    if (response?.data && response?.data?.success) {
      return response.data; 
    } else {
      throw new Error(' Oops something goes wrong');
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error; 
  }
};


export const addSong = async (newSong: object) => {
  try {
    const response = await axiosInstance.post(`/songs`, newSong);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to add song');
    }
  } catch (error) {
    console.error(error);
  }
};


export const updateSong = async (id: string, updatedSong: object) => {
  try {
    const response = await axiosInstance.put(`/songs/${id}`, updatedSong);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to update song');
    }
  } catch (error) {
    console.error(error);
  }
};



export const deleteSong = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/songs/${id}`);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to delete song');
    }
  } catch (error) {
    console.error(error);
  }
};




export const getStatistics = async () => {
  try {
    const response = await axiosInstance.get(`/statistics`);
    if (response?.data && response?.data?.success) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error('Failed to get statistics');
    }
  } catch (error) {
    console.error(error);
  }
};
