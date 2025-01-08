import fetch from "node-fetch";
import { getPreferenceValues } from "@raycast/api";

export type Spark = {
  thought: string;
  createdAt: string;
};

const endpoint = `${getPreferenceValues().endpoint}/sparks`;

export async function createSpark(thought: string) {
  const newSpark: Spark = {
    thought,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpark),
  });

  if (!response.ok) {
    throw Error(`${response.statusText} (HTTP ${response.status})`);
  }
}
