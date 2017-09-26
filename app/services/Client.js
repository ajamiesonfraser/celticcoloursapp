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
    workshops: {},
    artists: {},

    itinerary: []
  },

  _loadShows() {
    return axios.get('https://novastream.ca/xml2json.php?org=23998&type=shows&local=yes&field=name,formatted_date,date_unix,date,poster_url,formatted_start_time,formatted_end_time,venue_name,venue,seating,price,custom-fields,ticket_link,description_public,performances')
    .then(response => response.data)
  },

  _loadWorkshops() {
    return axios.get('https://novastream.ca/xml2json.php?org=23998&type=workshops&field=name,formatted_date,date_unix,date,poster_url,formatted_start_time,formatted_end_time,venue_name,venue,seating,price,custom-fields,ticket_link,description_public')
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

  _loadItinerary() {
    return AsyncStorage.getItem('itinerary').then((itinerary) => {
      if (itinerary == null) {
        itinerary = [];
        return AsyncStorage.setItem('itinerary', JSON.stringify(itinerary)).then(() => {
          return Promise.resolve(itinerary);
        });
      } else {
        return Promise.resolve(JSON.parse(itinerary));
      }
    }).catch((err) => {
      console.error('Error saving to itinerary', err);
    });
  },

  clearCachedData() {
    return Promise.all(['shows', 'workshops', 'artists'].map(x => AsyncStorage.removeItem(x)));
  },

  loadData() {
    return Promise.all([
      AsyncStorage.getItem('shows'),
      AsyncStorage.getItem('workshops'),
      AsyncStorage.getItem('artists'),
      Client._loadItinerary()
    ]).then(([shows, workshops, artists, itinerary]) => {
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
        return getShows().then((shows) => {
          return getArtists(shows).then((artists) => {
            // finally...
            return {
              shows,
              workshops,
              artists,
              itinerary
            }
          })
        })
      });
    }).then((data) => {
      Client.data = data
      Client.events.emit('data loaded', data)
    })
  },

  getShowById(id) {
    return Client.data.shows[id]
  },

  getWorkshopById(id) {
    return Client.data.workshops[id]
  },
  
  getArtistById(id) {
    return Client.data.artists[id]
  },

  addEventToItinerary(event) {
    return AsyncStorage.getItem('itinerary').then((itinerary) => {
      if (itinerary == null) {
        itinerary = [];
      } else {
        itinerary = JSON.parse(itinerary);
      }

      itinerary.push(event);
      return AsyncStorage.setItem('itinerary', JSON.stringify(itinerary)).then(() => {
        Client.data.itinerary = itinerary;
      });
    }).catch((err) => {
      console.error('Error saving to itinerary', err);
    });
  },

  removeEventFromItinerary(event) {
    return AsyncStorage.getItem('itinerary').then((itinerary) => {
      if (itinerary == null) {
        itinerary = [];
      } else {
        itinerary = JSON.parse(itinerary);
      }

      const index = itinerary.findIndex(x => x.id === event.id);

      if (index == -1) {
        alert('Event ' + event.name + ' not found in itinerary.');
        return Promise.resolve();
      } else {
        itinerary.splice(index, 1);
        
        return AsyncStorage.setItem('itinerary', JSON.stringify(itinerary)).then(() => {
          Client.data.itinerary = itinerary;
        });
      }
    }).catch((err) => {
      console.error('Error saving to itinerary', err);
    });
  },

  isEventInItinerary(event) {
    return Client.data.itinerary.find(x => x.id === event.id) !== undefined;
  }
}

module.exports = Client