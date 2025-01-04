import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheckIcon } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out",
    benefits: ["1 Site", "Upto 1000 visitors"],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Small Business ",
    cardDescription: "For small businesses with moderate traffic",
    benefits: ["Unlimited Sites", "Unlimited visitors"],
    priceTitle: "$29",
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
          Pricing plans for everyone and every budget!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Choose the plan that suits your need!
      </p>
      <div className="grid grid-cols-1 gap-8 mt-5 lg:grid-cols-2">
        {PricingPlans.map((plan) => (
          <Card key={plan.id} className={plan.id == 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {plan.id == 1 ? (
                  <div className="flex justify-between items-center">
                    <h3 className="text-primary">{plan.cardTitle}</h3>
                    <p className="rounded-full bg-primary/20 px-3 py-1 font-semibold leading-5 text-primary">
                      Recommended
                    </p>
                  </div>
                ) : (
                  plan.cardTitle
                )}
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold  mt-6 tracking-tighter">
                {plan.priceTitle}
              </p>
              <ul className="mt-8 space-y-2 text-muted-foreground">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <CheckCheckIcon className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === 1 ? (
                <form action={CreateSubscription}>
                  <SubmitButton text="Choose plan" className="mt-5" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5" asChild>
                  <Link href="/dashboard">try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
