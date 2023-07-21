import { Article } from "@/domain/models";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getArticles = async (page: number, pageSize: number): Promise<{ articles: Article[], totalPages: number }> => {
  const response = await fetch(`${apiUrl}/articles?page=${page}&pageSize=${pageSize}`);
  const data = await response.json();
  return data;
};