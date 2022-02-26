import React, {FC, useEffect, useMemo, useState} from 'react';
import PhotosService from './api/PhotosService';
import './App.scss';
import PhotoItem from './components/PhotoItem/PhotoItem';
import MySelect from './components/PhotoItem/select/select';
import {getPagesCount} from "./utils/pages";
import Loader from "./components/Loader/Loader";

export interface Photo {
    albumId: any;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string
}

const App: FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [filterPhotos, setFilterPhotos] = useState<Photo[]>([])
    const [isLoadingPhotos, setIsLoadingPhotos] = useState(false)
    const [selectedSort, setSelectedSort] = useState('')
    const [searchAlbumId, setSearchAlbumId] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100])
    const [totalPages, setTotalPages] = useState<any | null>(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    let pagesArray = [1, 2, 3, 4, 5]


    useEffect(() => {
        fetchPhotos()
    }, [page])

    async function fetchPhotos() {
        setIsLoadingPhotos(true)
        const response = await PhotosService.getByAlbumId(limit, page, selectedSort)
        setPhotos(response?.data)
        setTotalPages(response?.headers['x-total-count'])

        setIsLoadingPhotos(false)
    }


    useEffect(() => {
        getBuId(selectedSort)
    }, [selectedSort])

    async function getBuId(selectedSort: string) {
        setIsLoadingPhotos(true)
        const response = await PhotosService.getByAlbumId(limit, page, selectedSort)
        response?.data.length !== 0 && setPhotos(response?.data)
        const totalCount = response?.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
        setIsLoadingPhotos(false)

    }

    const removePhoto = async (photo: Photo) => {
        setIsLoadingPhotos(true)
        setPhotos(photos.filter((p: Photo) => p.id !== photo.id));
        await PhotosService.deletePost(photo.id)
        setIsLoadingPhotos(false)
    }
    const changePage = (page: number) => {
        setPage(page)
    }
    const sortPhotos = (sort: string) => {
        setIsLoadingPhotos(true)
        setSelectedSort(sort)
        photos && setFilterPhotos(photos.filter((p: Photo) => p.albumId === +sort))
        setIsLoadingPhotos(false)
        setPage(1)
    }

    return (
        <>
            <div className='App'>
                {isLoadingPhotos ? <Loader/>
                    : <>
                        <div>
                            <h1>Список картинок с сервера </h1>
                            <MySelect options={
                                searchAlbumId}
                                      value={selectedSort}
                                      defualtvalue='Сортировка'
                                      onChange={sortPhotos}/>

                        </div>
                        {filterPhotos.length ?
                            filterPhotos.map((photo: Photo) =>
                                <PhotoItem removePhoto={removePhoto} key={photo.id} photo={photo}/>)
                            : photos.length ? photos.map((photo: Photo) =>
                                    <PhotoItem removePhoto={removePhoto} key={photo.id} photo={photo}/>)
                                :
                                <Loader/>}
                    </>
                }
                <div className='page__wrapper'>
                    {pagesArray.map(p => (
                        <span onClick={() => changePage(p)} key={p}
                              className={page === p ? 'page page__current' : 'page'}>
                            {p}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
