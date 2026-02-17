const BASE_URL = 'http://localhost:4000/api/newsletters';

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Request failed');
  }
  return res.json();
};

export const getNewsletters = async (search = '') => {
  const res = await fetch(`${BASE_URL}?search=${search}`);
  return handleResponse(res);
};

export const getNewsletter = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

export const createNewsletter = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const updateNewsletter = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const publishNewsletter = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/publish`, {
    method: 'PATCH',
  });

  return handleResponse(res);
};

export const deleteNewsletter = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(res);
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  return handleResponse(res);
};
