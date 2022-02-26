import axios from "axios";

export default class PhotosService {
    static async getByAlbumId(limit = 10, page = 1, albumId) {
        if (albumId === '') albumId = 1
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response

        } catch (e) {
            console.log(e)
        }
    }

    static async deletePost(id) {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)

        } catch (e) {
            console.log(e)

        }
    }
}