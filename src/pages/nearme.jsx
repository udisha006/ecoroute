/*global google*/
import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import polyline from 'google-polyline'
  import 'haversine-distance'

const Nearme = () => {
  const center = { lat: 28.7041, lng: 77.1025 }


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      })
    
      const [map, setMap] = useState(/** @type google.maps.Map */ (null))
      const [directionsResponse, setDirectionsResponse] = useState(null)
      const [distance, setDistance] = useState('')
      const [duration, setDuration] = useState('')
    
      /** @type React.MutableRefObject<HTMLInputElement> */
      const originRef = useRef()
      /** @type React.MutableRefObject<HTMLInputElement> */
      const destiantionRef = useRef()
    
      if (!isLoaded) {
        return <SkeletonText />
      }


      function searchNearme() {

      }

      function clearSearch() {}
      function searchPlace() {
        const directionsService = new google.maps.DirectionsService()
        const directionsRenderer = new window.google.maps.DirectionsRenderer()
        const results = directionsService.route({
        origin: originRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
    }
      
      function codeAddress() {
        var address = originRef.current.value;
        var radius = parseInt(10, 10)*1000;
        var gmarkers
        var circle= new google.maps.Circle();
        var geocoder= new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            if (circle) circle.setMap(null);
            circle = new google.maps.Circle({center:marker.getPosition(),
                                           radius: radius,
                                           fillOpacity: 0.35,
                                           fillColor: "#FF0000",
                                           map: map});
            var bounds
            var ds
            ds = new google.maps.LatLngBounds();
            for (var i=0; i<gmarkers.length;i++) {
              if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(),marker.getPosition()) < radius) {
                bounds.extend(gmarkers[i].getPosition())
                gmarkers[i].setMap(map);
              } else {
                gmarkers[i].setMap(null);
              }
            }
            map.fitBounds(bounds);
      
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
  return (
    <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
        >
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type='text' placeholder='Place' ref={originRef} />
              </Autocomplete>
            </Box>
            
  
            <ButtonGroup>
            <Button colorScheme='blue' type='submit' onClick={codeAddress}>
                Search
              </Button>
              <Button colorScheme='blue' type='submit' onClick={searchNearme}>
                CS Near me
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearSearch}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
  
  )
}

export default Nearme
