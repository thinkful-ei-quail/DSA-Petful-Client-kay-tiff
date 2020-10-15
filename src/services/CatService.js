import config from '../config'

const CatService = {
  getCat() {
    return fetch(`${config.API_ENDPOINT}pets/cat`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteCat() {
    return fetch(`${config.API_ENDPOINT}pets/cat`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default CatService;