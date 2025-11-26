export type OrderEmailTemplate = {
  orderCode: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
};

export function orderEmailTemplate(data: OrderEmailTemplate) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px;">
        <tr>
            <td align="center">
                <h1 style="color: #444; margin-bottom: 20px;">Order Confirmation</h1>
            </td>
        </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px;">
        <tr>
            <td>
                <p style="margin-bottom: 20px;">Dear ${data.customerName},</p>
                <p style="margin-bottom: 20px;">Thank you for your order. We're pleased to confirm that we've received your order and it's being processed. Here are the details of your purchase:</p>
                
                <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h2>
                <p><strong>Order Number:</strong> ${data.orderCode}</p>
                <p><strong>Order Date:</strong> ${data.orderDate}</p>
                
                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f0f0f0;">
                        <th align="left" style="border: 1px solid #ddd;">Item</th>
                        <th align="center" style="border: 1px solid #ddd;">Quantity</th>
                        <th align="right" style="border: 1px solid #ddd;">Price</th>
                    </tr>
                    ${data.orderItems
                      .map(
                        (item) => `
                        <tr>
                            <td style="border: 1px solid #ddd;">${item.name}</td>
                            <td align="center" style="border: 1px solid #ddd;">${item.quantity}</td>
                            <td align="right" style="border: 1px solid #ddd;">${item.price} MMK</td>
                        </tr>
                    `
                      )
                      .join("")}
                    <tr>
                        <td colspan="2" align="right" style="border: 1px solid #ddd;"><strong>Total:</strong></td>
                        <td align="right" style="border: 1px solid #ddd;"><strong>${
                          data.total
                        } MMK</strong></td>
                    </tr>
                </table>
                
                <p style="margin-top: 20px;">If you have any questions about your order, please don't hesitate to contact our customer service team at <a href="mailto:support@gne.com" style="color: #3498db;">support@gne.com</a></p>
                
                <p style="margin-top: 20px;">Thank you for ordering from us!</p>
                
                <p>Best regards,<br>
                GrabNEat Team</p>
            </td>
        </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px; margin-top: 20px;">
        <tr>
            <td align="center" style="font-size: 12px; color: #777;">
                <p>&copy; 2024 GrabNEat. All rights reserved.</p>
                <p>
                    <a href="https://example.com/terms" style="color: #3498db; text-decoration: none;">Terms of Service</a> | 
                    <a href="https://example.com/privacy" style="color: #3498db; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
