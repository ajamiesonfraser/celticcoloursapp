import { AsyncStorage } from 'react-native'
import { EventEmitter } from 'fbemitter';
import axios from 'axios'

const Client = {
  _eventEmitter: new EventEmitter,

  get events() {
    return Client._eventEmitter
  },

  data: {
    shows: {},
    artists: {}
  },

  _loadShows() {
    return axios.get('https://novastream.ca/xml2json.php?org=23998&type=shows&local=yes&field=name,formatted_date,date,poster_url,formatted_start_time,venue_name,venue,seating,price,description_public,performances')
    .then(response => response.data)
  },

  _loadWorkshops() {
    return axios.get('https://novastream.ca/xml2json.php?org=23998&type=workshops&field=name,formatted_date,poster_url,formatted_start_time,formatted_end_time,venue_name,venue,seating,price,description_public')
    .then(response => response.data)
  },

  _getArtistsFromShows(shows) {
    var artists = {}

    Object.keys(shows).forEach(key => {
      if (shows[key].performances) {
        shows[key].performances.forEach(({ performance }) => {
          Object.keys(performance).forEach(artistId => {
            artists[artistId] = performance[artistId]
          })
        })
      }
    })

    return artists
  },

  loadData() {
    return Promise.all([
      AsyncStorage.getItem('shows'),
      AsyncStorage.getItem('workshops'),
      AsyncStorage.getItem('artists')
    ]).then(([shows, workshops, artists]) => {
      const getWorkshops = () => {
        if (workshops == null) {
          return Client._loadWorkshops().then((workshops) => {
            // save workshops
            return AsyncStorage.setItem('workshops', JSON.stringify(workshops)).then(() => {
              // now saved in async storage, return the fetched item
              return workshops
            })
          })
        } else {
          // loaded from async storage
          return Promise.resolve(JSON.parse(workshops))
        }
      }

      const getShows = () => {
        if (shows == null) {
          return Client._loadShows().then((shows) => {
            return AsyncStorage.setItem('shows', JSON.stringify(shows)).then(() => {
              return shows
            })
          })
        } else {
          return Promise.resolve(JSON.parse(shows))
        }
      }

      const getArtists = (shows) => {
        // have to load artists
        if (artists == null) {
          return Promise.resolve(Client._getArtistsFromShows(shows))
        } else {
          return Promise.resolve(JSON.parse(artists))
        }
      }
      
      return getWorkshops().then((workshops) => {
        /*if (shows == null) {
          return Client._loadShows().then((shows) => {
            return AsyncStorage.setItem('shows', JSON.stringify(shows)).then(() => {
              var artists = Client._getArtistsFromShows(shows)
              return AsyncStorage.setItem('artists', JSON.stringify(artists)).then(() => {
                return {
                  shows,
                  artists
                }
              })
            })
          })
        }

        const showsParsed = JSON.parse(shows)*/

        return getShows().then((shows) => {
          return getArtists(shows).then((artists) => {
            // finally...
            return {
              shows,
              workshops,
              artists
            }
          })
          
          
          //Client._getArtistsFromShows(shows)


          /*return AsyncStorage.setItem('artists', JSON.stringify(artists)).then(() => {
            return {
              shows,
              artists
            }
          })

          let artistsParsed;
        
          // have to load artists
          if (artists == null) {
            artistsParsed = Client._getArtistsFromShows(showsParsed) 
          } else {
            artistsParsed = JSON.parse(artists)
          }*/
        })
      });
    }).then((data) => {
      Client.data = data
      Client.events.emit('data loaded', data)
    })
  },

  // get(type) {
  //   return {
  //     byId: (id) => Client.data[type][id]
  //   }
  // },
  
  getArtistById(id) {
    return Client.data.artists[id]
  },

  getShowById(id) {
    return Client.data.shows[id]
  }
}

module.exports = Client