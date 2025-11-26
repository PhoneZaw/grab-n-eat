"use client";

export async function request(url: string, method: string, body?: any) {
  var fullUrl = process.env.BACKEND_URL + url;
  console.log("Api Request to ", url, "with method", method, "and body", body);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`Failed to ${method} data`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function requestWithResponse(
  url: string,
  method: string,
  body?: any
): Promise<any> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`Failed to ${method} data`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
