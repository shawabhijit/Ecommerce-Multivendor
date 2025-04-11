import React, { useEffect, useState } from 'react'


const steps : any = [
    {name: "Order Palced", description:"on Thu, 11 Jul", value: "PLACED"},
    {name: "Packed", description:"Item Packed in Dispatch Warehouse", value: "CONFIRMED"},
    {name: "Shipped", description:"by mon, 13 Jul", value: "SHIPPED"},
    {name: "Arriving", description:"by 13 Jul - 15 Jul", value: "ARRIVING"},
    {name: "Arrived", description:"by 16 Jul - 18 Jul", value: "DELIVERED"},
];

const canceledStep : any = [
    { name: "Order Palced", description: "on Thu, 11 Jul", value: "PLACED" },
    { name: "Order Canceled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const currentStep = 2; 

const OrderStepper = ({orderStatus} : any) => {

    const [statusStep , setStatusStep] = useState();

    useEffect(() => {
        
        if (orderStatus == 'CANCELLED') {
            setStatusStep(canceledStep)
        }
        else {
            setStatusStep(steps);
        }
    }, [orderStatus])

  return (
    <div>

    </div>
  )
}

export default OrderStepper