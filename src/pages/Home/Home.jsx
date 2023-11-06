import React from 'react'
import Banner from '../../components/Banner/Banner'
import { Container } from '@mui/material'
import ServicesList from '../Service/ServicesList'

const Home = () => {
  return (
    <div>
    
      <Banner />
      <ServicesList></ServicesList>
  
    </div>
  )
}

export default Home