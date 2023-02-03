/*global google*/
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

  //const polyline = require(google-polyline)
  
  const center = { lat: 48.8584, lng: 2.2945 }
  let waypoints = []
  let lat_upper
  let lat_lower
  let Lat_down
  let Lat_up
  //const directionsRenderer = new window.google.maps.DirectionsRenderer()
  
  function AppN() {
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
  
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      //console.log(originRef.current.value)
      //console.log(destinationRef.current.value)
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)

      // overview_polyline from this response object which contains all the waypoints on the route in an encoded format and can be accessed using result.routes[0].overview_polyline
      
      //console.log(results.routes[0].overview_polyline)
      //console.log(polyline.decode(results.routes[0].overview_polyline))
      
      waypoints = polyline.decode(results.routes[0].overview_polyline)
      console.log(waypoints)

      const PolygonCoords = PolygonPoints();
      const PolygonBound = new google.maps.Polygon({
      paths: PolygonCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
});
//to hide polygon set strokeOpacity and fillColor = 0
      PolygonBound.setMap(map);
      directionsRenderer.setMap(map);

    //find all related places along the route

    const service = new google.maps.places.PlacesService(map);
    for(let j = 0;j< waypoints.length;j+=40){
    service.nearbySearch({
    location: { lat:waypoints[j][0], lng:waypoints[j][1] },
    radius: '20000',
    type: ['Electric vehicles Charging Station']
    }, callback);
    function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
    if(google.maps.geometry.poly.containsLocation(results[i].geometry.location,PolygonBound) == true) {
    new google.maps.Marker({
    position: results[i].geometry.location,
    map,
    title: "Charging Station"
    }); /// madarchod marker nahi dikha rha
    }
    }
    }
    }
    }
    directionsRenderer.setMap(map)
    }
    
    function PolygonArray(latitude) {
      const R = 6378137;
      const pi = 3.14;
      //distance in meters
      const upper_offset = 1000;
      const lower_offset = -1000;
      Lat_up = upper_offset / R;
      Lat_down = lower_offset / R;
      //OffsetPosition, decimal degrees
      lat_upper = latitude + (Lat_up * 180) / pi;
      lat_lower = latitude + (Lat_down * 180) / pi;
      return [lat_upper, lat_lower];
      }

      function PolygonPoints() {
        let polypoints = waypoints
        let PolyLength = polypoints.length;
        let UpperBound = [];
        let LowerBound = [];
        for (let j = 0; j <= PolyLength - 1; j++) {
        let NewPoints = PolygonArray(polypoints[j][0]);
        UpperBound.push({ lat: NewPoints[0], lng: polypoints[j][1] });
        LowerBound.push({ lat: NewPoints[1], lng: polypoints[j][1] });
        }
        let reversebound = LowerBound.reverse();
        let FullPoly = UpperBound.concat(reversebound);
        return FullPoly;
        }

    async function calculateCP() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      
    }
  
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
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
                <Input type='text' placeholder='Origin' ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>
  
            <ButtonGroup>
              <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
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
  
  export default AppN
  