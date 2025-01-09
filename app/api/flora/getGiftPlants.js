// app/api/flora/getGiftPlants.js

export const getGiftPlants = async () => {
  // const apiUrl = process.env.NEXT_PUBLIC_FLORA_API_URL;
  // const token = process.env.FLORA_API_TOKEN;
  // const testApiUrl = process.env.NEXT_PUBLIC_FLORA_TEST_API_URL;

  const testApiUrl = "https://api.test.floralogistics.nl/v1/channels?api_key=12345"

  try {
    const response = await fetch(testApiUrl, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`, errorDetails);
      return [];
    }

    const data = await response.json()

    console.log("data:", data)
    // Extract the first 5 plants for simplicity
    return data?.orders?.slice(0, 5) || [];
  } catch (error) {
    console.error("Error connecting:", error);
    return [];
  }
}