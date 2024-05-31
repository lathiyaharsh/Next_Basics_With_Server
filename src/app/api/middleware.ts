import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Access user ID from middleware (replace with your logic)
  const userId = req.user?.id; // Assuming middleware populates req.user

  if (!userId || req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const url = new URL(`/api/profile/${userId}`, req.nextUrl.origin);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const profileData = await response.json();
    return res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
