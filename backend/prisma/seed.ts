import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dummySubscriptions = [
  {
    title: "Basic Plan",
    subtitle: "Ideal for individuals",
    price: 9.99,
    bonuses: [
      "Access to a basic library of articles.",
      "Monthly newsletter with updates and tips.",
      "Standard customer support via email.",
      "Access to a community forum.",
    ],
    minuses: [
      "No access to premium video tutorials.",
      "No priority customer support.",
    ],
  },
  {
    title: "Standard Plan",
    subtitle: "Perfect for small teams",
    price: 19.99,
    bonuses: [
      "All bonuses from the Basic Plan.",
      "Access to premium tutorials and webinars.",
      "Priority customer support.",
      "Downloadable resources and templates.",
    ],
    minuses: [
      "No access to advanced tools.",
      "Personalized recommendations and content tailored to your needs.",
    ],
  },
  {
    title: "Premium Plan",
    subtitle: "For larger organizations",
    price: 29.99,
    bonuses: [
      "All bonuses from the Standard Plan",
      "One-on-one coaching sessions.",
      "Exclusive access to advanced tools.",
      "Personalized recommendations and content tailored to your needs.",
    ],
    minuses: [],
  },
];

async function main() {
  // Create subscriptions
  for (const sub of dummySubscriptions) {
    await prisma.subscription.create({
      data: sub,
    });
  }

  console.log("Subscriptions created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
