import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, PermissionsAndroid, Pressable } from "react-native";
import BottomSheet, { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import MapView, { MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import tw from 'tailwind-react-native-classnames'
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env'
import { Keyboard, Alert } from "react-native";
import GetLocation from 'react-native-get-location'
import { Image } from "react-native";
import { mapStyle } from "./components/MapStyle";
import { withDelay } from "react-native-reanimated";





let hydplat:number = 17.4065;
let hydplng:number = 78.4772;
let hyddlat:number = 17.3616;
let hyddlng:number= 78.4747;




const App = () => {


    const ext= useEffect(  ()=> {   requestLocationPermission();                },[]);
    
    useEffect(()=>
    {
             const interval = setInterval(async()=>
             {

             
              
              
             



             },4000);

             return ()=>clearInterval(interval)
    },[]);


  const keyboardShowListener = Keyboard.addListener( 
    'keyboardDidShow', 
    () => { 
        console.log('Keyboard is open') 
        sheetRef.current?.snapToIndex(2);
    } 
); 
const keyboardHideListener = Keyboard.addListener( 
    'keyboardDidHide', 
    () => { 
        console.log('Keyboard is closed') 
    } 
);
    

const requestLocationPermission = async () => {
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'HelloCabs  App Location Permission',
        message:
          'Hello Cabs  App needs access to your camera ' +
          'so we can make your travel better.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) 
    {
      console.log('Getting the location');
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
     
        console.log(location);
        setplat(location.latitude);
        setplng(location.longitude);

     
       
        
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
       
    })
    } 
    else 
    {
      console.log('Location permission denied');
     
    }
  }
   catch (err)
    {

    console.warn(err);
    
    }

  
};

const requestLocationPermission_and_update_to_db = async () => {
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'HelloCabs  App Location Permission',
        message:
          'Hello Cabs  App needs access to your camera ' +
          'so we can make your travel better.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) 
    {
      console.log('Getting the location');
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
     
        console.log(location);

              


        setVlat(location.latitude);
        setVlng(location.longitude);

     
       
        
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
       
    })
    } 
    else 
    {
      console.log('Location permission denied');
     
    }
  }
   catch (err)
    {

    console.warn(err);
    
    }

  
};

  
  
  

  let [can_sel_pmarker,setpsel]=useState(false);
  let [can_sel_dmarker,setdsel]=useState(false);

  let [pmarker_enabled,setpmarker]=useState(true);
  let [dmarker_enabled,setdmarker]=useState(false);
   
  let [plat,setplat]=useState(17.4065);
  let [plng,setplng]=useState(78.4772);
  let [dlat,setdlat]=useState(17.3616);
  let[dlng,setdlng]=useState(78.4747);
  
  let [vignaan_lat,setVlat]=useState(17.3685);
  let [vignaan_lng,setVlng]=useState(78.5316);

  let [Anil_lat,set_Alat]=useState(17.3317);
  let[Anil_lng,set_Alng]=useState(78.5754);
  
  let [Parthu_lat,set_parthu_lat]=useState(17.5169);
  let[Parthu_lng,set_parthu_lng]=useState(78.3428);


  
  let [mpsize,setMapsize] = useState('h-12');
 
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  let mapRef = useRef<MapView>();
  let searchDest=useRef();
  // variables
  const snapPoints = useMemo(() => [ "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index:number) => {
    
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index:number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  return (
    <GestureHandlerRootView style={{flex:1}}>
       

    <View style={{flex:1}}>
    
             
    <MapView
    provider={PROVIDER_GOOGLE}
     ref={mapRef}
  initialRegion={{
    latitude: plat,
    longitude: plng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}

    onRegionChange={(r)=>
      {
            if(pmarker_enabled && !dmarker_enabled && can_sel_pmarker )
            {
                 setplat(r.latitude);
                 setplng(r.longitude);
            }
            else if(!pmarker_enabled && dmarker_enabled && can_sel_dmarker)
            {
              setdlat(r.latitude);
              setdlng(r.longitude);
            }

      }}
  
  style={tw`h-2/4`}
  customMapStyle={mapStyle}
  
  zoomControlEnabled={true} >
    { pmarker_enabled &&
    <Marker coordinate={{latitude:plat,longitude:plng}}  image={require("./Images/greenpin3.png")}  >

    </Marker>
}

{   dmarker_enabled &&
    <Marker coordinate={{latitude:dlat,longitude:dlng}}   image={require("./Images/pinkpin3.png")}    >

</Marker>
}
{  pmarker_enabled && dmarker_enabled &&
    <MapViewDirections origin={{latitude:plat,longitude:plng}} destination={{latitude:dlat,longitude:dlng}} strokeColor="black" strokeWidth={3} apikey={GOOGLE_MAPS_API_KEY} onReady={result=>{mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{right:30,bottom:100,left:30,top:100}})}} >

    </MapViewDirections>
}
<Marker coordinate={{latitude:vignaan_lat,longitude:vignaan_lng}}  image={require("./Images/RedCar.png")}   ></Marker>

<Marker coordinate={{latitude:Anil_lat,longitude:Anil_lng}} image={require("./Images/RedBike.png")}     ></Marker>


<Marker coordinate={{latitude:Parthu_lat,longitude:Parthu_lng}}  image={require("./Images/WhiteCar.png")}    ></Marker>

    </MapView>
    <View style={{height:100}}></View>
    <View style={{alignContent:"flex-end",alignItems:"center"}}>
      {pmarker_enabled && !dmarker_enabled && <Button  title="Confirm pickup location"  onPress={()=>{setdmarker(true); sheetRef.current?.snapToIndex(0);setpsel(false);}}     ></Button> }
      {dmarker_enabled && !pmarker_enabled && <Button title="Confirm drop location" onPress={()=>{setpmarker(true); sheetRef.current?.snapToIndex(0); setdsel(false);}}></Button> }
    </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={{backgroundColor:"#FAF3DD"}}
      >
        <BottomSheetView style={{marginTop:50}}>
        <Pressable onPress={async()=>{ requestLocationPermission();  }}><Image source={require("./Images/current-location.png")} style={{height:25,width:25}}></Image></Pressable>

         
        <GooglePlacesAutocomplete
                   placeholder='🟢 Search Your Location'

                   listHoverColor="grey"

                   styles={{container:{flex:0,},textInput:{fontSize:18,backgroundColor:"#D3D3D3"},}}

                   query={{key: GOOGLE_MAPS_API_KEY,
                            language:'en'      }}

                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                             
                            debounce={400}
                      
                   
                  

                  onPress={(data,details)=>
                  {
                    
                    
                          
                     setplat(details?.geometry.location.lat);
                     setplng(details?.geometry.location.lng);   
                     sheetRef.current?.snapToIndex(0); 
                      
                  }}

                       

                 
                

                    
              >


              </GooglePlacesAutocomplete>
              <TouchableOpacity style={{alignItems:"center",borderRadius:60,backgroundColor:"black"}} >
                 
                <Button  color={"black"} title="Select Pickup Location on Map"  onPress={()=>{setdmarker(false); setpmarker(true); mapRef.current?.animateToRegion(
                  {
                    latitude:plat,
                    longitude:plng,
                    latitudeDelta: 0.065,
                    longitudeDelta: 0.01
                  },
                  500
                );  sheetRef.current?.close(); setpsel(true);}}>

                </Button>
              </TouchableOpacity>

              <GooglePlacesAutocomplete
                   placeholder='🔴 Search Destination'

                   ref={searchDest}

                   

                   styles={{container:{flex:0},textInput:{fontSize:18,backgroundColor:"#D3D3D3"},}}

                   query={{key: GOOGLE_MAPS_API_KEY,
                            language:'en'      }}

                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'

                            debounce={400}
                      
                  

                            onPress={(data,details)=>
                              {
                                
                                 
                              
                                
                                 setdlat(details?.geometry.location.lat);
                                 setdlng(details?.geometry.location.lng);    
                                 sheetRef.current?.snapToIndex(0);

                                  
                              }}



                enablePoweredByContainer={false}

                    
              >


              </GooglePlacesAutocomplete>
              <TouchableOpacity style={{alignItems:"center",backgroundColor:"black",borderRadius:60}}>
                <Button  color={"black"} title="Select Drop Location on Map" onPress={()=>{setdmarker(true); setpmarker(false); mapRef.current?.animateToRegion(
                  {
                    latitude:dlat,
                    longitude:dlng,
                    latitudeDelta: 0.065,
                    longitudeDelta: 0.01
                  },
                  500
                );  sheetRef.current?.close(); setdmarker(true);  setdsel(true); }} >

                </Button>
              </TouchableOpacity>
               
                
        </BottomSheetView>
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  
});

export default App;