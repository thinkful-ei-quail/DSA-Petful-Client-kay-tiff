import config from '../config'

const DogService = {
  getDog() {
    return fetch(`${config.API_ENDPOINT}pets/dog`, {
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
  deleteDog() {
    return fetch(`${config.API_ENDPOINT}pets/dog`, {
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

export default DogService;