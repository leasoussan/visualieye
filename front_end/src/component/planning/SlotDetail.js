import React, { useState } from "react";
import { useEffect } from "react";



const SlotDetail = () => {
    const [slotDetail, setSlotDetail] = useState(null);

    useEffect(() => {
        const getSlotDetail = async () => {
            const dataFetch = await fetch(`http://localhost:5000/slot_detail/1`)
            const data = await dataFetch.json();
            setSlotDetail(data[0])
        };
        getSlotDetail()

        return () => {

            console.log("in the second return clean up");;

        }
    }, [])


    const displayDetailSlot = () => {

        console.log(slotDetail)
        
        return (
          <>
           <div id={slotDetail.slot_id}>
            <h2> {slotDetail.title}</h2>
            <h3>{slotDetail.slot_type}</h3>
            <h3>{slotDetail.starting_time}</h3>
            <h3>{slotDetail.end_time}</h3>
            <h3>{slotDetail.transportation ? "need Transportation time" : "you can do it from home"}</h3>
            <h3>{slotDetail.fixed_slot ? "permanent" : "occasional"}</h3>


           </div>


          </>
        
        )
    }


    return (

        <div>
            {
                slotDetail ?
                // console.log(slotDetail[0])

                displayDetailSlot()       
                :
                    console.log("here is no")

            }


        </div>
    )


}


export default SlotDetail;
