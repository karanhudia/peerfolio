import { prisma } from "../src/lib/db";
import bcrypt from "bcrypt";

async function main() {
  console.log("Starting seed...");
  
  // Clean up existing data
  await prisma.report.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.person.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log("Deleted existing data");
  
  // Create tags
  const tags = [
    "Technical Skills",
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Mentorship",
    "Empathy",
    "Time Management",
    "Attention to Detail",
    "Organization",
  ];
  
  const createdTags = await Promise.all(
    tags.map(name => 
      prisma.tag.create({ data: { name } })
    )
  );
  
  console.log(`Created ${createdTags.length} tags`);
  
  // Create users
  const hashedPassword = await bcrypt.hash("password123", 12);
  
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      hashedPassword,
      role: "ADMIN",
    },
  });
  
  const normalUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        name: "Bob Johnson",
        email: "bob@example.com",
        hashedPassword,
      },
    }),
  ]);
  
  console.log(`Created ${normalUsers.length + 1} users`);
  
  // Create people
  const people = await Promise.all([
    prisma.person.create({
      data: {
        name: "Alex Rodriguez",
        title: "Senior Software Engineer",
        linkedinUrl: "https://linkedin.com/in/alexr",
      },
    }),
    prisma.person.create({
      data: {
        name: "Sarah Thompson",
        title: "Product Manager",
        linkedinUrl: "https://linkedin.com/in/saraht",
      },
    }),
    prisma.person.create({
      data: {
        name: "Michael Chen",
        title: "Data Scientist",
        linkedinUrl: "https://linkedin.com/in/michaelc",
      },
    }),
    prisma.person.create({
      data: {
        name: "Emily Davis",
        title: "UX Designer",
        linkedinUrl: "https://linkedin.com/in/emilyd",
      },
    }),
  ]);
  
  console.log(`Created ${people.length} people`);
  
  // Helper function to get random items from an array
  function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Create reviews
  const relationships = ["mentor", "interviewer", "manager", "colleague"];
  const reviews = [];
  
  for (const person of people) {
    // Each person gets 2-4 reviews
    const reviewCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < reviewCount; i++) {
      // Get a random user (excluding admin)
      const user = normalUsers[Math.floor(Math.random() * normalUsers.length)];
      
      // Get 1-3 random tags
      const reviewTags = getRandomItems(createdTags, 1 + Math.floor(Math.random() * 3));
      
      // Get a random relationship
      const relationship = relationships[Math.floor(Math.random() * relationships.length)];
      
      // Get a random rating (3-5)
      const rating = 3 + Math.floor(Math.random() * 3);
      
      // Create a review
      const review = await prisma.review.create({
        data: {
          rating,
          relationship,
          content: `${person.name} was an excellent ${relationship}. They were very knowledgeable and supportive. I really appreciated their guidance and would highly recommend working with them.`,
          isApproved: true,
          author: {
            connect: { id: user.id },
          },
          person: {
            connect: { id: person.id },
          },
          tags: {
            connect: reviewTags.map(tag => ({ id: tag.id })),
          },
        },
      });
      
      reviews.push(review);
    }
  }
  
  console.log(`Created ${reviews.length} reviews`);
  
  // Create a few reports
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        reason: "This review contains inappropriate language.",
        reporter: {
          connect: { id: normalUsers[0].id },
        },
        review: {
          connect: { id: reviews[0].id },
        },
      },
    }),
    prisma.report.create({
      data: {
        reason: "This review seems fake and doesn't reflect my actual experience with this person.",
        reporter: {
          connect: { id: normalUsers[1].id },
        },
        review: {
          connect: { id: reviews[2].id },
        },
      },
    }),
  ]);
  
  console.log(`Created ${reports.length} reports`);
  
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 