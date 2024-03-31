import React, { useState } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
  } from "@paypal/react-paypal-js";
//import './Checkout.css';


const Checkout = () => {
    // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    // const [currency, setCurrency] = useState(options.currency);

    // const onCurrencyChange = ({ target: { value } }) => {
    //     setCurrency(value);
    //     dispatch({
    //         type: "resetOptions",
    //         value: {
    //             ...options,
    //             currency: value,
    //         },
    //     });
    // }

    // const onCreateOrder = (data,actions) => {
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 amount: {
    //                     value: "8.99",
    //                 },
    //             },
    //         ],
    //     });
    // }

    // const onApproveOrder = (data,actions) => {
    //     return actions.order.capture().then((details) => {
    //         const name = details.payer.name.given_name;
    //         alert("Transaction completed by", {name});
    //     });
    // }
    // This value is from the props in the UI
const style = {layout: "vertical", maxWidth: "750px", minHeight: "200px" };

function createOrder() {
    // replace this url with your server
    return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
            cart: [
                {
                    sku: "1blwyeo8",
                    quantity: 2,
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((order) => {
            // Your code here after create the order
            return order.id;
        });
}
function onApprove(data) {
    // replace this url with your server
    return fetch("api/v1/user/profile/order/:orderId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderID: data.orderID,
        }),
    })
        .then((response) => response.json())
        .then((orderData) => {
            // Your code here after capture the order
        });
}
const ButtonWrapper = ({ showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}
    // 
    // function App() {
    //     return (
    //         <div style={{ maxWidth: "750px", minHeight: "200px" }}>
    //             <PayPalScriptProvider options={{ clientId: "AR-D2whhF2m7-eM8B7Au6QAh2G4E_-uccTV0H-Hi5q7Nyou4tM97Ig87SCm5FwApENYxKauyt7ze_HHz", components: "buttons", currency: "USD" }}>
    //                 <ButtonWrapper showSpinner={false} />
    //             </PayPalScriptProvider>
    //         </div>
    //     );
    // }
}

export default Checkout;