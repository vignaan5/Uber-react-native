import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, PermissionsAndroid, Pressable } from "react-native";
import BottomSheet, { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import MapView, { MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import tw from 'tailwind-react-native-classnames'
import MapViewDirections from "react-native-maps-directions";
import Geocoder from 'react-native-geocoding'
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env'
import { Keyboard, Alert } from "react-native";
import GetLocation from 'react-native-get-location'
import { Image } from "react-native";
import { mapStyle } from "./components/MapStyle";
import { withDelay } from "react-native-reanimated";
import * as Realm from 'realm';




let hydplat = 17.4065;
let hydplng = 78.4772;
let hyddlat = 17.3616;
let hyddlng= 78.4747;




const App = () => {

    
  const update_gyanu=async(lati,longi)=>
  {

    const app = new Realm.App({ id: "application-1-kuyls" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const alldata = await user.functions.updateGyanuData(lati,longi);
      console.log(alldata);
     await  get_data();
    } catch(err) {
      console.error("Failed to log in", err);
    }
    

  }


  const update_anil=async(lati,longi)=>
  {

    const app = new Realm.App({ id: "application-1-kuyls" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const alldata = await user.functions.updateAnilData(lati,longi);
      console.log(alldata);
     await  get_data();
    } catch(err) {
      console.error("Failed to log in", err);
    }
    

  }


  const update_Parthu=async(lati,longi)=>
  {

    const app = new Realm.App({ id: "application-1-kuyls" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const alldata = await user.functions.updateParthuData(lati,longi);
      console.log(alldata);
      await get_data();
    } catch(err) {
      console.error("Failed to log in", err);
    }
    

  }

  const get_data=async()=>
  {
   const app = new Realm.App({ id: "application-1-kuyls" });
   const credentials = Realm.Credentials.anonymous();
   try {
     const user = await app.logIn(credentials);
     const alldata = await user.functions.getallData();
   
      
     setTrackingMarkersCords({Anil_lat:alldata[0].latitude,Anil_lng:alldata[0].longitude,Parthu_lat:alldata[1].latitude,Parthu_lng:alldata[1].longitude,gyan_lat:alldata[2].latitude,gyanu_lng:alldata[2].longitude});


     console.log(alldata);
   } catch(err) {
     console.error("Failed to log in", err);
   }
   
 
  }
 


   
    //const ext= useEffect(  ()=> {   requestLocationPermission();            },[]);
    
    useEffect(()=>
    {
      Geocoder.init(GOOGLE_MAPS_API_KEY);
             const interval = setInterval(async()=>
             {

               requestLocationPermission_and_update_to_db();
                 
              
              



             },4000);

             return ()=>clearInterval(interval)
    },[]);


  const keyboardShowListener = Keyboard.addListener( 
    'keyboardDidShow', 
    () => { 
        console.log('Keyboard is open') 
        sheetRef.current?.snapToIndex(1);
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

              


        

         //update_gyanu(location.latitude,location.longitude);
         
                //  update_Parthu(location.latitude,location.longitude);

                update_anil(location.latitude,location.longitude);

        
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
  
 

  let [TrackingMarksCords,setTrackingMarkersCords]= useState({gyan_lat:17.385,gyanu_lng:78.5316,Parthu_lat:17.5169,Parthu_lng:78.3428,Anil_lat:17.3317,Anil_lng:78.5754});
                     

  
  let [mpsize,setMapsize] = useState('h-12');
 
  // hooks
  const sheetRef = useRef(null);

  let mapRef = useRef();
  let pl_ref = useRef();
  let searchDest=useRef();
  // variables
  const snapPoints = useMemo(() => [ "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
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
           
              onRegionChangeComplete={(r)=>
                {
                  if(pmarker_enabled && !dmarker_enabled && can_sel_pmarker )
                  {
                      
                       
                       Geocoder.from(r.latitude,r.longitude).then((data)=>{
                        let fetchDetails=data.results[0].formatted_address;
      

                         pl_ref.current?.setAddressText(fetchDetails);
      
                       });
                  }
                  else if(!pmarker_enabled && dmarker_enabled && can_sel_dmarker)
                  {
                    Geocoder.from(r.latitude,r.longitude).then((data)=>{
                      let fetchDetails=data.results[0].formatted_address;
    

                       searchDest.current?.setAddressText(fetchDetails);
    
                     });
                  }

                }}



    onRegionChange={(r)=>
      {
            if(pmarker_enabled && !dmarker_enabled && can_sel_pmarker )
            {
                 setplat(r.latitude);
                 setplng(r.longitude);
                 
                 Geocoder.from(r.latitude,r.longitude).then((data)=>{
                  let fetchDetails=data.results[0].formatted_address;

                  console.log(fetchDetails);

                 });
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
<Marker coordinate={{latitude:TrackingMarksCords.gyan_lat,longitude:TrackingMarksCords.gyanu_lng}}  image={require("./Images/RedCar.png")}   ></Marker>

<Marker coordinate={{latitude:TrackingMarksCords.Anil_lat,longitude:TrackingMarksCords.Anil_lng}} image={require("./Images/RedBike.png")}     ></Marker>


<Marker coordinate={{latitude:TrackingMarksCords.Parthu_lat,longitude:TrackingMarksCords.Parthu_lng}}  image={require("./Images/WhiteCar.png")}    ></Marker>

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
                    ref={pl_ref}
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
               <Image style={{alignContent:"center",alignItems:"center",}} source={require("./Images/vignaan.png")}></Image>
                
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