import axios from 'axios';

const API_URL = 'http://localhost:5000/api/newsletters';

const createFormData = (newsletterData) => {
  const formData = new FormData();
  
  // Add all sections data
  formData.append('templateIndex', newsletterData.templateIndex);
  formData.append('sections', JSON.stringify(newsletterData.sections));
  formData.append('publishOptions', JSON.stringify(newsletterData.publishOptions));
  
  // Add all images
  newsletterData.sections.forEach(section => {
    section.images.forEach(image => {
      if (image.file) {
        formData.append('images', image.file, image.file.name);
      }
    });
  });
  
  // Add PDF if exists
  if (newsletterData.pdfFile?.file) {
    formData.append('pdf', newsletterData.pdfFile.file);
  }
  
  return formData;
};

const createNewsletter = async (newsletterData) => {
  const formData = createFormData(newsletterData);
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const getNewsletters = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getNewsletter = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateNewsletter = async (id, newsletterData) => {
  const formData = createFormData(newsletterData);
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const deleteNewsletter = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  createNewsletter,
  getNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter
};