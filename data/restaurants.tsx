type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

// loop the payments array and return 100 payments
// with random status and email
// this is just for testing purposes
// in real world scenario, this data will be fetched from the server
// and will be paginated
export function getPayments(): Payment[] {
  const payments: Payment[] = [];
  for (let i = 0; i < 100; i++) {
    const status = ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ];
    const email = "email.com";
    payments.push({
      id: i.toString(),
      amount: Math.floor(Math.random() * 100),
      status,
      email,
    });
  }
  return payments;
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "d9b1f1c4",
    amount: 75,
    status: "success",
    email: "",
  },
  {
    id: "f3b2f1a9",
    amount: 50,
    status: "failed",
    email: "example@gmail.com",
  },
];
