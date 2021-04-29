import React from 'react';
import ReactStars from "react-rating-stars-component";

export const CriteriosEvaluator = ({criterios}) => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };


    return (
        <>
             {
                criterios.map((item, index)=>{
                    return( 
                    <tr key={index}> 
                        <td> {item.nombre}   
                        </td>
                        <td> 
                         <div>
                         <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="rgba(22,157,54,1)"
                            />
                         </div>
                        </td>
                    </tr>
                    )
                })
             }
        </>      
    )
}
