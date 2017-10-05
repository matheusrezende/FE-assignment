import firebase from 'firebase'

export const fetch = (path) => new Promise((resolve, reject) => {
  firebase.database().ref(path).on('value', snapshot => {
    resolve(snapshot)
  })
})

export const getCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(position => {
    resolve(position.coords)
  })
})
