import { Article } from "@/domain/models";
import api from "@/utils/api";

export const getArticles = async (page: number, pageSize: number): Promise<{ articles: Article[], totalPages: number }> => {
  const response = await api.get(`/articles?page=${page}&pageSize=${pageSize}`)
  return response.data
};