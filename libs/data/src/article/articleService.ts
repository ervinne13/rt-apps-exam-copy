import axios from 'axios';
import { IArticle, IArticleList } from './articleTypes';

const axiosClient = axios.create({
  baseURL: 'https://www.footballtransfers.com/nl/api/v1',
});

export const fetchArticles = async ({ page = 1, ids }: { page: number; ids?: string[] }) => {
  const params: Record<string, string> = {
    page: page.toString(),
  };

  if (ids) {
    params.articleIds = ids.join(',');
  }

  const { data } = await axiosClient.get<IArticleList>('/articles', {
    params,
  });

  return { articles: data, page };
};

export const fetchArticleById = async (id: string) => {
  const { data } = await axiosClient.get<IArticle>(`/articles/${id}`);
  return data;
};
