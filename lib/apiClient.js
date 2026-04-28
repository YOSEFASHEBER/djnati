export const apiClient = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("API Client Error:", err);
    throw err;
  }
};
