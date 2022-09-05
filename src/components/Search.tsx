import React, { useState, useEffect, useCallback, useMemo } from 'react';
// @ts-ignore
import parse from 'url-parse';
import Image from './Image';
import logo from './../logo.svg';
import { fetchList } from '../api';
import { IImageItem, IResult, IParams } from '../types';

// test demo query
// ?id=23451156376&owner=28017113@N08&secret=8983a8ebc7&server=578&farm=1&title&Merry Christmas!&ispublic=1&isfriend=0&isfamily=0

const Search = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IImageItem[]>([]);
  const [searchParams, setSearchParams] = useState<IParams>({});
  const [page, setPage] = useState<number>(1);
	const [noMore, setNoMore] = useState<boolean>(false);

  const search = useCallback((query: IParams, page: number) => {
    setPage(page);
    setLoading(true);
    fetchList(query, page)
      .then(response => {
				const res: IResult = response.data;
        const newData = [...data, ...res.photos.photo];
        setData(newData);
        setLoading(false);
				if (page === res.photos.pages) {
					setNoMore(true);
				}
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [data]);

  useEffect(() => {
    const url = parse(window.location.href);
    setSearchParams(url.query);
    search(url.query, 1);
  }, []);

	const loadMore = useCallback(() => {
		search(searchParams, page + 1);
  	}, [searchParams, page, data]);

	const images = data.map(image => {
    let farm = image.farm;
    let server = image.server;
    let id = image.id;
    let secret = image.secret;
    let title = image.title;
    let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    return <Image url={url} key={id} alt={title} />;
    });
	
  return (
    <div className="search-container">
			<div className="search-image-container">
				{images}
			</div>
			{
				loading ? 
				<img src={logo} className="App-logo" alt="logo" /> :
				(
					noMore ? <h2>Finish</h2> : <a className="search-button" onClick={loadMore}>More</a>
				)
			}
    </div>
  );
};

export default Search;