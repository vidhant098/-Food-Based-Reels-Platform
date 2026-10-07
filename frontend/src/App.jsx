import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (

<>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '8px',
            background:'#151525',
           color: '#fff',
            fontWeight: 500,
          },
        }}
      />



    <AppRoutes /> 
    </>
  ) 

}

export default App
