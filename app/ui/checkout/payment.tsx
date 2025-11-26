"use client";

import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
	Elements,
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
const clientSecretFromEnv = process.env.NEXT_PUBLIC_STRIPE_TEST_CLIENT_SECRET;

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<string | undefined>(undefined);
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setProcessing(true);

		const { error: submitError } = await elements.submit();
		if (submitError) {
			setError(submitError.message);
			setProcessing(false);
			return;
		}

		// Here you would typically create a payment intent on your server
		// and return the client secret. For this example, we'll use a placeholder.
		const clientSecret = "placeholder_client_secret";

		const { error: paymentError } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: "https://your-website.com/order-confirmation",
			},
		});

		if (paymentError) {
			setError(paymentError.message);
		} else {
			// Payment successful, handle accordingly
			console.log("Payment successful");
		}

		setProcessing(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			{error && <div className="text-red-500 mt-2">{error}</div>}
			<Button
				type="submit"
				disabled={!stripe || processing}
				className="w-full mt-4"
			>
				{processing ? "Processing..." : "Pay now"}
			</Button>
		</form>
	);
};

export const StripePaymentComponent = () => {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		if (clientSecretFromEnv) {
			setClientSecret(clientSecretFromEnv);
		}
	}, [clientSecretFromEnv]);

	if (!stripePromise) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Payment</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-red-500">
						Missing Stripe publishable key. Set
						NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment.
					</div>
				</CardContent>
			</Card>
		);
	}

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "flat",
		},
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment</CardTitle>
			</CardHeader>
			<CardContent>
				{clientSecret && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentForm />
					</Elements>
				)}
			</CardContent>
		</Card>
	);
};
