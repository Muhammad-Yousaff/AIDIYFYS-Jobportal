import React from 'react'
import ScrollToTop from "react-scroll-to-top";

const Arrow = () => {
    return (
        <div>
            <ScrollToTop smooth className='bg-primary' width='20' height='20' color='white'
                style={{
                    backgroundColor: "rgb(14 165 233)", borderRadius: "100%", display: "flex",
                    justifyContent: "center", alignItems: "center"
                }} />
        </div>
    )
}

export default Arrow