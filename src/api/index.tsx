import axios from 'axios';
import { IParams } from '../types';

const PAGE_SIZE = 20;

export function fetchList(query: IParams, page: number) {
    return axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=kittens`, {
            params: {
                ...query,
                per_page: PAGE_SIZE,
                page
            }
        }
      )
}