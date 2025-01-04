/**
 * The `Features` component renders a section that highlights the main features of the application.
 * It includes a title, a subtitle, and a brief description.
 *
 * @returns A JSX element representing the features section.
 */

import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description: "Sign up for free and get started with your blog",
    icon: CloudRain,
  },
  {
    name: "Blazing Fast",
    description:
      " Experience lightning-fast performance with our optimized platform",
    icon: CloudRain,
  },
  {
    name: "Super Secure with Kinde",
    description: "We take security seriously. Your data is safe with us",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description: "Our platform is easy to use and requires no technical skills",
    icon: CloudRain,
  },
];
export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="text-primary font-semibold leading-7">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in Minutes
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Right here you can create a blog in minutes. We make it easy for you
          to create a blog in minutes
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className=" mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
