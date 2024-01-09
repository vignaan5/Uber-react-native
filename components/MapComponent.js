import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { MapViewProps } from "react-native-maps";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import tw from 'tailwind-react-native-classnames'
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_APIKEY} from '@env';

const MapComponent = () => {
const mapRef=useRef();
  let [plat,setplat]=useState(17.4065);
  let [plng,setplng]=useState(78.4772);
  let [dlat,setdlat]=useState(17.3616);
  let[dlng,setdlng]=useState(78.4747);

  return (
    <MapView
     ref={mapRef}
  initialRegion={{
    latitude: plat,
    longitude: plng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}

  style={tw`h-3/4`}
  
  zoomControlEnabled={true} >

    <MapViewDirections origin={{latitude:plat,longitude:plng}} destination={{latitude:19.0760,longitude:dlng}} strokeColor="hotpink" strokeWidth={3} apikey={GOOGLE_MAPS_APIKEY} onReady={result=>{mapRef.current.fitToCoordinates(result.coordinates,{edgePadding:{right:30,bottom:300,left:30,top:100}})}} >

    </MapViewDirections>

    </MapView>
  )
}

export default MapComponent

const styles = StyleSheet.create({})