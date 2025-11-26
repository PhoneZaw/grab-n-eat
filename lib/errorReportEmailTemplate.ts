export type OrderErrorReport = {
  orderCode: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  errorMessage: string;
  branchId: string;
};

export function errorReportEmailTemplate(data: OrderErrorReport) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Error Report</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px;">
        <tr>
            <td align="center">
                <h1 style="color: #d9534f; margin-bottom: 20px;">Order Error Report</h1>
            </td>
        </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px;">
        <tr>
            <td>
                <p style="margin-bottom: 20px;">Dear Restaurant Owner,</p>
                <p style="margin-bottom: 20px;">An error has been reported for the following order:</p>
                
                <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Details</h2>
                <p><strong>Order Number:</strong> ${data.orderCode}</p>
                <p><strong>Order Date:</strong> ${data.orderDate}</p>
                <p><strong>Customer Name:</strong> ${data.customerName} </p>
                <p><strong>Customer Email:</strong> ${data.customerEmail} </p>
                <p><strong>Customer Phone:</strong> ${data.customerPhone} </p>
                
                <h2 style="color: #d9534f; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Error Report</h2>
                <p><strong>Reported by Customer:</strong> Yes</p>
                <p><strong>Error Message:</strong></p>
                <div style="background-color: #f9f9f9; border-left: 4px solid #d9534f; padding: 10px; margin-bottom: 20px;">
                    <p>${data.errorMessage}</p>
                </div>
                
                <h2 style="color: #444; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Action Required</h2>
                <p>Please investigate this error and take appropriate action to resolve the issue.</p>
                
                <p style="margin-top: 20px;">If you have any questions or need additional information, please contact the IT support team at <a href="mailto:support@gne.com" style="color: #3498db;">support@gne.com</a>.</p>
                
                <p style="margin-top: 20px;">Thank you for your prompt attention to this matter.</p>
                
                <p>Best regards,<br>
                GrabNEat Team</p>
            </td>
        </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px; margin-top: 20px;">
        <tr>
            <td align="center" style="font-size: 12px; color: #777;">
                <p>&copy; 2023 GrabNEat Team. All rights reserved.</p>
                <p>
                    <a href="https://example.com/terms" style="color: #3498db; text-decoration: none;">Terms of Service</a> | 
                    <a href="https://example.com/privacy" style="color: #3498db; text-decoration: none;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}
