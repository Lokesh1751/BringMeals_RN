import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import QuickDel from '../Components/QuickDel'
import Toppicks from '../Components/Toppicks'
import OurMeal from '../Components/OurMeal'
import SpecialPlatters from '../Components/SpecialPlatters'
import TopCategories from '../Components/TopCategories'
import Footer from '../Components/Footer'
const Home = ({navigation}:any) => {

  return (
    <ScrollView >
    <Navbar nav={navigation} />
    <Slider/>
    <QuickDel/>
    <Toppicks/>
    <OurMeal/>
    <SpecialPlatters/>
    <TopCategories/>
<Footer/>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})