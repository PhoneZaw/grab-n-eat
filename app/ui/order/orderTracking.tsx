"use client";

import {
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Star,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailResponse } from "@/services/order/orderRead";
import { OrderStatus } from "@prisma/client";
import { request } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ReviewResponse } from "@/services/review/getReview";
import {
  errorReportEmailTemplate,
  OrderErrorReport,
} from "@/lib/errorReportEmailTemplate";
import { format } from "date-fns";
import { sendMail } from "@/lib/mailService";
import { parseDateToReadableDateTimeString } from "@/lib/utils";

const orderStatuses = [
  { status: OrderStatus.ORDERPLACED, label: "OrderPlaced" },
  { status: OrderStatus.PREPARING, label: "Preparing" },
  { status: OrderStatus.READY, label: "Ready" },
  { status: OrderStatus.PICKED, label: "Picked" },
];

export default function OrderTracking({
  order,
  reviewData,
}: {
  order: OrderDetailResponse;
  reviewData: ReviewResponse | null;
}) {
  const router = useRouter();
  const currentStatusIndex = orderStatuses.findIndex(
    (status) => status.status === order.status
  );
  const readyForPickup = order.status === OrderStatus.READY;
  const isAvailableToCancel =
    currentStatusIndex < 1 && order.status !== OrderStatus.CANCELLED;
  const isPickUpButtonToShow =
    currentStatusIndex != orderStatuses.length - 1 &&
    order.status !== OrderStatus.CANCELLED;

  const pickUpHandler = async () => {
    await request("/api/order/pickup", "POST", { orderId: order.id });

    toast({
      description: "Order has been picked up successfully",
    });

    // Refresh the page
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const cancelHandler = async () => {
    await request("/api/order/cancel", "POST", { orderId: order.id });

    toast({
      description: "Order has been cancelled successfully",
    });

    // Refresh the page
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", comment, rating);

    const response = request("/api/reviews", "POST", {
      orderCode: order.orderCode,
      rating,
      review: comment,
    });

    toast({
      title: "Review Submitted",
      description: "Thank you for your review.",
    });

    setIsReviewOpen(false);

    // Refresh the page

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const [report, setReport] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (report.trim()) {
      // Here you would typically send the report to your backend
      console.log("Report submitted:", report);
      toast({
        title: "Report Submitted",
        description: "We will reply you after resolving the problem.",
      });
      setReport("");
      setIsOpen(false);

      await request("/api/sendMail/errorReport", "POST", {
        orderCode: order.orderCode,
        orderDate: format(order.orderDate, "dd/MM/yyyy"),

        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone || "",
        errorMessage: report,
        branchId: order.branch.id,
      } as OrderErrorReport);
    } else {
      toast({
        title: "Error",
        description: "Please enter a report before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleReview}>
            <DialogHeader>
              <DialogTitle>Write a review</DialogTitle>
            </DialogHeader>
            <div className="my-4 flex flex-col gap-4">
              <div className="flex justify-center">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <Star
                        className={`w-8 h-8 ${
                          ratingValue <= (hover || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
              <Textarea
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Send Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Report Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleReport}>
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
              <DialogDescription>
                Describe the issue you're experiencing. We'll review your report
                and take appropriate action.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                id="report"
                placeholder="Type your report here."
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Order #{order.orderCode}</CardTitle>
          <CardDescription>
            <p>Track your order status</p>
            <p>
              Order Placed at -{" "}
              {parseDateToReadableDateTimeString(order.orderDate)}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">
                Order Status{" - "}
                {order.status === OrderStatus.PICKED ? (
                  <>
                    <span className="text-green-500">Picked</span>
                  </>
                ) : order.status === OrderStatus.CANCELLED ? (
                  <>
                    <span className="text-destructive">Cancelled</span>
                  </>
                ) : (
                  ""
                )}
              </h3>
              <p className="text-sm text-muted">
                {order.createdAt.toDateString()}
              </p>
            </div>
            {order.status === OrderStatus.CANCELLED ? (
              <div className="mb-4 flex gap-2">
                <CheckCircle className="w-5 h-5 text-destructive" />
                <p className="text-destructive">
                  Order has been cancelled at{" "}
                  <span>{order.cancelledAt?.toDateString()}</span>
                </p>
              </div>
            ) : (
              <div className="flex justify-between mb-4">
                {orderStatuses.map((status, index) => (
                  <div
                    key={status.status}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= currentStatusIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {index < currentStatusIndex ||
                      index === orderStatuses.length - 1 ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs mt-1">{status.label}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Status List */}
            {/* <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  View Detailed Status <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <Table>
                  <TableBody>
                    {orderStatuses.map((status, index) => (
                      <TableRow key={status.status}>
                        <TableCell className="font-medium">
                          {status.status}
                        </TableCell>
                        <TableCell>{status.time || "Pending"}</TableCell>
                        <TableCell>
                          {index <= currentStatus ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CollapsibleContent>
            </Collapsible> */}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-black">
                          Item
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          Qty
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order?.orderItems &&
                        order.orderItems.map((item) => (
                          <TableRow key={item.branchMenu.name}>
                            <TableCell>
                              {item.branchMenu.name}
                              <br />
                              {item.specialInstruction && (
                                <span className="text-xs text-gray-500">
                                  - {item.specialInstruction}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.unitPrice * item.quantity} MMK
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="">
                      <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell className="text-right">
                          {order.TotalPrice} MMK
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell colSpan={2}>Tax (8%)</TableCell>
                        <TableCell className="text-right">
                          ${tax}
                        </TableCell>
                      </TableRow> */}
                      {order.promotionCode && (
                        <TableRow className="text-green-500">
                          <TableCell colSpan={2}>
                            Coupon <b>({order.promotionCode})</b>
                          </TableCell>
                          <TableCell className="text-right text-primary text-green-500">
                            - {order.promotionDiscount} MMK
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell colSpan={2} className="font-bold">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {order.Total} MMK
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Pickup Details</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Store className="w-5 h-5 mr-2" />
                    <p className="font-semibold"> {order.branch.name} </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <p>{order.branch.fullAddress}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <p> {order.branch.contactNumber} </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="" onClick={() => setIsOpen(true)}>
                Report
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive hover:text-destructive"
                onClick={cancelHandler}
                disabled={!isAvailableToCancel}
              >
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isPickUpButtonToShow && (
            <Button disabled={!readyForPickup} onClick={pickUpHandler}>
              Confirm Pickup
            </Button>
          )}
          {order.status === OrderStatus.PICKED && !reviewData && (
            <Button
              onClick={() => {
                setIsReviewOpen(true);
                setRating(5);
                setHover(0);
                setComment("");
              }}
            >
              Give a review
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
